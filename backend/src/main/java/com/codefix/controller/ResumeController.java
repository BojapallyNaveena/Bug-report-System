package com.codefix.controller;

import com.codefix.model.FixCoinTransaction;
import com.codefix.model.FixCoinWallet;
import com.codefix.service.FixCoinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    private final FixCoinService fixCoinService;

    public ResumeController(FixCoinService fixCoinService) {
        this.fixCoinService = fixCoinService;
    }

    @PostMapping("/build")
    public ResponseEntity<?> buildResume(@RequestParam String userId, @RequestBody Map<String, Object> payload) {
        // 1. Check FixCoin balance (20 FC cost requirement)
        FixCoinWallet wallet = fixCoinService.getOrCreateWallet(userId);
        if (wallet.getBalance() < 20) {
            Map<String, Object> err = new HashMap<>();
            err.put("status", "INSUFFICIENT_FUNDS");
            err.put("currentBalance", wallet.getBalance());
            err.put("required", 20);
            err.put("message", "You need " + (20 - wallet.getBalance()) + " more FixCoins to build your resume.");
            return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).body(err);
        }

        // 2. Build / Gather verified resume profile
        Map<String, Object> resume = new HashMap<>();
        resume.getOrDefault("id", "resume-" + UUID.randomUUID().toString().substring(0, 8));
        resume.put("id", "resume-" + UUID.randomUUID().toString().substring(0, 8));
        resume.put("userId", userId);
        resume.put("title", payload.getOrDefault("title", "Software Engineer Resume"));
        resume.put("template", payload.getOrDefault("template", "ATS_FRIENDLY"));
        resume.put("createdAt", LocalDateTime.now().toString());

        // 3. Deduct exactly 20 FC only after successful creation
        boolean deducted = fixCoinService.deductCoins(userId, 20, "Resume Build", (String) resume.get("id"));
        if (!deducted) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process transaction. Coins were NOT deducted.");
        }

        resume.put("remainingBalance", wallet.getBalance() - 20);
        resume.put("editUnlocked", true);
        return ResponseEntity.ok(resume);
    }
}

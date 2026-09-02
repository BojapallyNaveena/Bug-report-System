package com.codefix.service;

import com.codefix.model.FixCoinTransaction;
import com.codefix.model.FixCoinWallet;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class FixCoinService {

    private final Map<String, FixCoinWallet> wallets = new ConcurrentHashMap<>();
    private final Set<String> processedActivityIds = Collections.newSetFromMap(new ConcurrentHashMap<>());
    private final List<FixCoinTransaction> transactions = Collections.synchronizedList(new ArrayList<>());

    public FixCoinWallet getOrCreateWallet(String userId) {
        return wallets.computeIfAbsent(userId, id -> {
            FixCoinWallet w = new FixCoinWallet();
            w.setId(UUID.randomUUID().toString());
            w.setUserId(id);
            w.setBalance(27); // Default demo starting balance
            w.setTotalEarned(47);
            w.setTotalSpent(20);
            return w;
        });
    }

    public synchronized boolean awardCoins(String userId, int amount, String reason, String activityId) {
        // Prevent duplicate rewards for the same activity ID
        if (activityId != null && processedActivityIds.contains(activityId)) {
            return false;
        }

        FixCoinWallet wallet = getOrCreateWallet(userId);
        wallet.setBalance(wallet.getBalance() + amount);
        wallet.setTotalEarned(wallet.getTotalEarned() + amount);

        if (activityId != null) {
            processedActivityIds.add(activityId);
        }

        FixCoinTransaction tx = FixCoinTransaction.builder()
                .id(UUID.randomUUID().toString())
                .userId(userId)
                .amount(amount)
                .transactionType("EARN")
                .reason(reason)
                .referenceId(activityId)
                .build();

        transactions.add(tx);
        return true;
    }

    public synchronized boolean deductCoins(String userId, int amount, String reason, String referenceId) {
        FixCoinWallet wallet = getOrCreateWallet(userId);
        if (wallet.getBalance() < amount) {
            return false;
        }

        wallet.setBalance(wallet.getBalance() - amount);
        wallet.setTotalSpent(wallet.getTotalSpent() + amount);

        FixCoinTransaction tx = FixCoinTransaction.builder()
                .id(UUID.randomUUID().toString())
                .userId(userId)
                .amount(-amount)
                .transactionType("SPEND")
                .reason(reason)
                .referenceId(referenceId)
                .build();

        transactions.add(tx);
        return true;
    }

    public List<FixCoinTransaction> getHistory(String userId) {
        return transactions;
    }
}

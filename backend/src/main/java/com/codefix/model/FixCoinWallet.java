package com.codefix.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fixcoin_wallet")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FixCoinWallet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "user_id", nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private int balance;

    @Column(name = "total_earned", nullable = false)
    private int totalEarned;

    @Column(name = "total_spent", nullable = false)
    private int totalSpent;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

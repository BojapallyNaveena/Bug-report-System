package com.codefix.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fixcoin_transaction")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FixCoinTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(nullable = false)
    private int amount;

    @Column(name = "transaction_type", nullable = false)
    private String transactionType; // EARN or SPEND

    @Column(nullable = false)
    private String reason;

    @Column(name = "reference_id")
    private String referenceId; // Activity ID to prevent duplicate rewards

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

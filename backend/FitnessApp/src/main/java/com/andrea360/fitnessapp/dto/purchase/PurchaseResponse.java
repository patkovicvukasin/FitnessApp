package com.andrea360.fitnessapp.dto.purchase;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseResponse {

    private Long id;
    private Long trainingTypeId;
    private int quantity;
    private int remaining;
    private LocalDateTime purchasedAt;
}

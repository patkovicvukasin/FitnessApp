package com.andrea360.fitnessapp.dto.purchase;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseResponse {

    private Long id;
    private String trainingTypeName;
    private BigDecimal trainingTypePrice;
    private BigDecimal totalPrice;
    private int quantity;
    private int remaining;
    private LocalDateTime purchasedAt;
}

package com.andrea360.fitnessapp.dto.purchase;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePurchaseRequest {

    @NotNull(message = "Member ID is required")
    private Long memberId;

    @NotNull(message = "Training type ID is required")
    private Long trainingTypeId;

    @Positive(message = "Quantity must be greater than zero")
    private int quantity;

    private String stripePaymentIntentId;
}

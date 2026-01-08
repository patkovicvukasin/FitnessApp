package com.andrea360.fitnessapp.dto.payment;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePaymentIntentRequest {

    @NotNull(message = "Member ID is required")
    private Long memberId;

    @NotNull(message = "Training type ID is required")
    private Long trainingTypeId;

    @Positive(message = "Quantity must be greater than zero")
    private int quantity;
}
package com.andrea360.fitnessapp.dto.payment;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreatePaymentIntentResponse {
    private String clientSecret;
    private Long amount;
}
package com.andrea360.fitnessapp.service.payment;

import com.andrea360.fitnessapp.model.Purchase;
import com.andrea360.fitnessapp.dto.payment.ConfirmPaymentRequest;
import com.andrea360.fitnessapp.dto.payment.CreatePaymentIntentRequest;
import com.andrea360.fitnessapp.dto.payment.CreatePaymentIntentResponse;

public interface PaymentService {
    CreatePaymentIntentResponse createPaymentIntent(String email, CreatePaymentIntentRequest request);
    Purchase confirmPayment(String email, ConfirmPaymentRequest request);
}
package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.purchase.PurchaseMapper;
import com.andrea360.fitnessapp.dto.purchase.PurchaseResponse;
import com.andrea360.fitnessapp.dto.payment.ConfirmPaymentRequest;
import com.andrea360.fitnessapp.dto.payment.CreatePaymentIntentRequest;
import com.andrea360.fitnessapp.dto.payment.CreatePaymentIntentResponse;
import com.andrea360.fitnessapp.service.payment.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final PurchaseMapper purchaseMapper;

    @PreAuthorize("hasRole('MEMBER')")
    @PostMapping("/create-intent")
    public CreatePaymentIntentResponse createPaymentIntent(
            @Valid @RequestBody CreatePaymentIntentRequest request
    ) {
        return paymentService.createPaymentIntent(request);
    }

    @PreAuthorize("hasRole('MEMBER')")
    @PostMapping("/confirm")
    public PurchaseResponse confirmPayment(
            @Valid @RequestBody ConfirmPaymentRequest request
    ) {
        return purchaseMapper.toResponse(
                paymentService.confirmPayment(request)
        );
    }
}
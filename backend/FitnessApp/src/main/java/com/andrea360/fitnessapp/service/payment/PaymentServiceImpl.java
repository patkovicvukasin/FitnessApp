package com.andrea360.fitnessapp.service.payment;

import com.andrea360.fitnessapp.exception.common.BadRequestException;
import com.andrea360.fitnessapp.exception.common.NotFoundException;
import com.andrea360.fitnessapp.model.Member;
import com.andrea360.fitnessapp.model.Purchase;
import com.andrea360.fitnessapp.model.TrainingType;
import com.andrea360.fitnessapp.dto.payment.ConfirmPaymentRequest;
import com.andrea360.fitnessapp.dto.payment.CreatePaymentIntentRequest;
import com.andrea360.fitnessapp.dto.payment.CreatePaymentIntentResponse;
import com.andrea360.fitnessapp.model.User;
import com.andrea360.fitnessapp.repository.MemberRepository;
import com.andrea360.fitnessapp.repository.UserRepository;
import com.andrea360.fitnessapp.service.member.MemberService;
import com.andrea360.fitnessapp.service.purchase.PurchaseService;
import com.andrea360.fitnessapp.service.trainingType.TrainingTypeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentConfirmParams;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final TrainingTypeService trainingTypeService;
    private final PurchaseService purchaseService;

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @Override
    public CreatePaymentIntentResponse createPaymentIntent(String email, CreatePaymentIntentRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Member member = memberRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Member not found"));

        TrainingType trainingType = trainingTypeService.getById(request.getTrainingTypeId());

        long amountInCents = trainingType.getPrice()
                .multiply(BigDecimal.valueOf(request.getQuantity()))
                .multiply(BigDecimal.valueOf(100))
                .longValue();

        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("eur")
                    .putMetadata("memberId", String.valueOf(member.getId()))
                    .putMetadata("trainingTypeId", String.valueOf(trainingType.getId()))
                    .putMetadata("quantity", String.valueOf(request.getQuantity()))
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .setAllowRedirects(PaymentIntentCreateParams.AutomaticPaymentMethods.AllowRedirects.NEVER)
                                    .build()
                    )
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            return new CreatePaymentIntentResponse(
                    intent.getClientSecret(),
                    amountInCents
            );

        } catch (StripeException e) {
            throw new BadRequestException("Failed to create payment intent: " + e.getMessage());
        }
    }

    @Override
    public Purchase confirmPayment(String email, ConfirmPaymentRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Member member = memberRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Member not found"));

        try {
            PaymentIntent intent = PaymentIntent.retrieve(request.getPaymentIntentId());

            if (!"succeeded".equals(intent.getStatus())) {
                intent = intent.confirm(
                        PaymentIntentConfirmParams.builder()
                                .setPaymentMethod("pm_card_visa")
                                .build()
                );
            }

            if (!"succeeded".equals(intent.getStatus())) {
                throw new BadRequestException(
                        "Payment has not been completed. Status: " + intent.getStatus()
                );
            }

            return purchaseService.createPurchase(
                    member.getId(),
                    request.getTrainingTypeId(),
                    request.getQuantity(),
                    request.getPaymentIntentId()
            );

        } catch (StripeException e) {
            throw new BadRequestException("Failed to verify payment: " + e.getMessage());
        }
    }
}
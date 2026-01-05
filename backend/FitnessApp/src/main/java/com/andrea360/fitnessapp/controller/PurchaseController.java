package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.purchase.CreatePurchaseRequest;
import com.andrea360.fitnessapp.dto.purchase.PurchaseMapper;
import com.andrea360.fitnessapp.dto.purchase.PurchaseResponse;
import com.andrea360.fitnessapp.service.purchase.PurchaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;
    private final PurchaseMapper purchaseMapper;

    @PostMapping
    public PurchaseResponse create(@Valid @RequestBody CreatePurchaseRequest request) {
        return purchaseMapper.toResponse(
                purchaseService.createPurchase(
                        request.getMemberId(),
                        request.getTrainingTypeId(),
                        request.getQuantity(),
                        request.getStripePaymentIntentId()
                )
        );
    }

    @GetMapping("/member/{memberId}")
    public List<PurchaseResponse> getForMember(@PathVariable Long memberId) {
        return purchaseService.getPurchasesForMember(memberId)
                .stream()
                .map(purchaseMapper::toResponse)
                .toList();
    }
}

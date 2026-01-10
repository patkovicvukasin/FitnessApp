package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.purchase.PurchaseMapper;
import com.andrea360.fitnessapp.dto.purchase.PurchaseResponse;
import com.andrea360.fitnessapp.service.purchase.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;
    private final PurchaseMapper purchaseMapper;


    @PreAuthorize("hasRole('MEMBER')")
    @GetMapping("/my-purchases")
    public List<PurchaseResponse> getMyPurchases(Authentication auth) {
        String email = auth.getName();
        return purchaseService.getMyPurchases(email)
                .stream()
                .map(purchaseMapper::toResponse)
                .toList();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @GetMapping("/all")
    public List<PurchaseResponse> getAll() {
        return purchaseService.getAllPurchases()
                .stream()
                .map(purchaseMapper::toResponse)
                .toList();
    }
}

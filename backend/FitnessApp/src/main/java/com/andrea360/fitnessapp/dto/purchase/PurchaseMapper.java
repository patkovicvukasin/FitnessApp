package com.andrea360.fitnessapp.dto.purchase;

import com.andrea360.fitnessapp.model.Purchase;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PurchaseMapper {

    public PurchaseResponse toResponse(Purchase purchase) {
        if (purchase == null) {
            return null;
        }

        BigDecimal totalPrice = purchase.getTrainingType().getPrice()
                .multiply(BigDecimal.valueOf(purchase.getQuantity()));

        return new PurchaseResponse(
                purchase.getId(),
                purchase.getTrainingType().getName(),
                purchase.getTrainingType().getPrice(),
                totalPrice,
                purchase.getQuantity(),
                purchase.getRemaining(),
                purchase.getPurchasedAt()
        );
    }
}

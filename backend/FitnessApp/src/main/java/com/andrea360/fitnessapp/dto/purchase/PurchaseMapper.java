package com.andrea360.fitnessapp.dto.purchase;

import com.andrea360.fitnessapp.model.Purchase;
import org.springframework.stereotype.Component;

@Component
public class PurchaseMapper {

    public PurchaseResponse toResponse(Purchase purchase) {
        if (purchase == null) {
            return null;
        }

        return new PurchaseResponse(
                purchase.getId(),
                purchase.getTrainingType().getId(),
                purchase.getQuantity(),
                purchase.getRemaining(),
                purchase.getPurchasedAt()
        );
    }
}

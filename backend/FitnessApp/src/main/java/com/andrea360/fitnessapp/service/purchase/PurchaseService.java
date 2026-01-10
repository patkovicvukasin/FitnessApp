package com.andrea360.fitnessapp.service.purchase;

import com.andrea360.fitnessapp.model.Purchase;
import java.util.List;

public interface PurchaseService {

    Purchase createPurchase(
            Long memberId,
            Long serviceId,
            int quantity,
            String stripePaymentIntentId
    );

    List<Purchase> getMyPurchases(String email);

    List<Purchase> getAllPurchases();

}


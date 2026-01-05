package com.andrea360.fitnessapp.dto.purchase;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePurchaseRequest {

    private Long memberId;
    private Long trainingTypeId;
    private int quantity;
    //null for now
    private String stripePaymentIntentId;
}

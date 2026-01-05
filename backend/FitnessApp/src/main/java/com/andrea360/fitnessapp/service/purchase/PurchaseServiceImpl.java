package com.andrea360.fitnessapp.service.purchase;

import com.andrea360.fitnessapp.model.TrainingType;
import com.andrea360.fitnessapp.model.Member;
import com.andrea360.fitnessapp.model.Purchase;
import com.andrea360.fitnessapp.repository.PurchaseRepository;
import com.andrea360.fitnessapp.service.trainingType.TrainingTypeService;
import com.andrea360.fitnessapp.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final MemberService memberService;
    private final TrainingTypeService trainingTypeService;

    @Override
    public Purchase createPurchase(
            Long memberId,
            Long serviceId,
            int quantity,
            String stripePaymentIntentId
    ) {

        Member member = memberService.getById(memberId);
        TrainingType trainingType = trainingTypeService.getById(serviceId);

        Purchase purchase = new Purchase();
        purchase.setMember(member);
        purchase.setTrainingType(trainingType);
        purchase.setQuantity(quantity);
        purchase.setRemaining(quantity);
        purchase.setStripePaymentIntentId(stripePaymentIntentId);
        purchase.setPurchasedAt(LocalDateTime.now());

        return purchaseRepository.save(purchase);
    }

    @Override
    public List<Purchase> getPurchasesForMember(Long memberId) {
        return purchaseRepository.findByMemberId(memberId);
    }
}

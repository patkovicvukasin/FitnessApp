package com.andrea360.fitnessapp.service.purchase;

import com.andrea360.fitnessapp.exception.common.NotFoundException;
import com.andrea360.fitnessapp.exception.purchase.ForbiddenPurchaseException;
import com.andrea360.fitnessapp.model.*;
import com.andrea360.fitnessapp.repository.MemberRepository;
import com.andrea360.fitnessapp.repository.PurchaseRepository;
import com.andrea360.fitnessapp.repository.UserRepository;
import com.andrea360.fitnessapp.service.trainingType.TrainingTypeService;
import com.andrea360.fitnessapp.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final MemberService memberService;
    private final TrainingTypeService trainingTypeService;
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;

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
    public List<Purchase> getMyPurchases(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Member member = memberRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Member not found"));

        return purchaseRepository.findByMemberId(member.getId());
    }

    @Override
    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }
}

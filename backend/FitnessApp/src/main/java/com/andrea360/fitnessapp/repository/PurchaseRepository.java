package com.andrea360.fitnessapp.repository;

import com.andrea360.fitnessapp.model.Purchase;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findByMemberId(Long memberId);

    Optional<Purchase> findFirstByMemberIdAndFitnessServiceIdAndRemainingGreaterThanOrderByPurchasedAtAsc(
            Long member_id, Long fitnessService_id, int remaining
    );

}

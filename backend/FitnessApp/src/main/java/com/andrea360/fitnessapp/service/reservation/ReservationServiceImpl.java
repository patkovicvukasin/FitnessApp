package com.andrea360.fitnessapp.service.reservation;

import com.andrea360.fitnessapp.model.Purchase;
import com.andrea360.fitnessapp.model.Reservation;
import com.andrea360.fitnessapp.model.TrainingSession;
import com.andrea360.fitnessapp.repository.PurchaseRepository;
import com.andrea360.fitnessapp.repository.ReservationRepository;
import com.andrea360.fitnessapp.repository.TrainingSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final TrainingSessionRepository trainingSessionRepository;
    private final PurchaseRepository purchaseRepository;

    @Override
    @Transactional
    public Reservation reserveSession(Long memberId, Long trainingSessionId) {

        TrainingSession session = trainingSessionRepository.findById(trainingSessionId)
                .orElseThrow(() -> new IllegalArgumentException("Training session not found"));

        if (reservationRepository.existsByMemberIdAndTrainingSessionId(memberId, trainingSessionId)) {
            throw new IllegalArgumentException("Member already reserved this session");
        }

        int reservedCount = reservationRepository.countByTrainingSessionId(trainingSessionId);
        if (reservedCount >= session.getMaxCapacity()) {
            throw new IllegalArgumentException("Session capacity is full");
        }

        Purchase purchase = purchaseRepository
                .findFirstByMemberIdAndTrainingTypeIdAndRemainingGreaterThanOrderByPurchasedAtAsc(
                        memberId,
                        session.getTrainingType().getId(),
                        0
                )
                .orElseThrow(() -> new IllegalArgumentException("No valid purchase for this service"));

        purchase.setRemaining(purchase.getRemaining() - 1);

        Reservation reservation = new Reservation();
        reservation.setMember(purchase.getMember());
        reservation.setTrainingSession(session);
        reservation.setReservedAt(LocalDateTime.now());

        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> getReservationsForMember(Long memberId) {
        return reservationRepository.findByMemberId(memberId);
    }

    @Override
    public int getAvailableSlots(Long trainingSessionId) {
        TrainingSession session = trainingSessionRepository.findById(trainingSessionId)
                .orElseThrow(() -> new IllegalArgumentException("Training session not found"));

        int reserved = reservationRepository.countByTrainingSessionId(trainingSessionId);
        return session.getMaxCapacity() - reserved;
    }
}

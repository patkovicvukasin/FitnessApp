package com.andrea360.fitnessapp.service.reservation;

import com.andrea360.fitnessapp.exception.common.BadRequestException;
import com.andrea360.fitnessapp.exception.common.NotFoundException;
import com.andrea360.fitnessapp.exception.reservation.NoRemainingCreditsException;
import com.andrea360.fitnessapp.exception.reservation.SessionAlreadyReservedException;
import com.andrea360.fitnessapp.exception.reservation.SessionFullException;
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
                .orElseThrow(() -> new NotFoundException("Training session not found"));

        if (reservationRepository.existsByMemberIdAndTrainingSessionId(memberId, trainingSessionId)) {
            throw new SessionAlreadyReservedException("Member already reserved this session");
        }

        // Check if member has any overlapping reservation in this time range
        if (reservationRepository
                .existsByMemberIdAndTrainingSession_StartTimeLessThanAndTrainingSession_EndTimeGreaterThan(
                        memberId,
                        session.getEndTime(),
                        session.getStartTime()
                )) {
            throw new BadRequestException(
                    "Member already has a reservation in the given time range"
            );
        }

        int reservedCount = reservationRepository.countByTrainingSessionId(trainingSessionId);
        if (reservedCount >= session.getMaxCapacity()) {
            throw new SessionFullException("Session capacity is full");
        }

        // Use the oldest purchase with remaining credits for this training type
        Purchase purchase = purchaseRepository
                .findFirstByMemberIdAndTrainingTypeIdAndRemainingGreaterThanOrderByPurchasedAtAsc(
                        memberId,
                        session.getTrainingType().getId(),
                        0
                )
                .orElseThrow(() -> new NoRemainingCreditsException("No valid purchase for this service"));

        purchase.setRemaining(purchase.getRemaining() - 1);

        Reservation reservation = new Reservation();
        reservation.setMember(purchase.getMember());
        reservation.setTrainingSession(session);
        reservation.setPurchase(purchase);
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
                .orElseThrow(() -> new NotFoundException("Training session not found"));

        int reserved = reservationRepository.countByTrainingSessionId(trainingSessionId);
        return session.getMaxCapacity() - reserved;
    }

    @Override
    @Transactional
    public void cancelReservation(Long reservationId) {

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new NotFoundException("Reservation not found"));

        TrainingSession session = reservation.getTrainingSession();

        if (session.getStartTime().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Cannot cancel a reservation for a session that has already started");
        }

        Purchase purchase = reservation.getPurchase();
        purchase.setRemaining(purchase.getRemaining() + 1);

        reservationRepository.delete(reservation);
    }

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}

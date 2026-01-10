package com.andrea360.fitnessapp.service.reservation;

import com.andrea360.fitnessapp.exception.auth.AccessDeniedException;
import com.andrea360.fitnessapp.exception.common.BadRequestException;
import com.andrea360.fitnessapp.exception.common.NotFoundException;
import com.andrea360.fitnessapp.exception.reservation.NoRemainingCreditsException;
import com.andrea360.fitnessapp.exception.reservation.SessionAlreadyReservedException;
import com.andrea360.fitnessapp.exception.reservation.SessionFullException;
import com.andrea360.fitnessapp.model.*;
import com.andrea360.fitnessapp.repository.*;
import com.andrea360.fitnessapp.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;
    private final MemberRepository memberRepository;

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

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User currentUser = userRepository.findByEmail(email).orElseThrow();

        if (currentUser.getRole() == Role.EMPLOYEE) {
            Employee employee = employeeRepository.findByUserId(currentUser.getId())
                    .orElseThrow(() -> new NotFoundException("Employee not found"));

            if (!session.getEmployee().getId().equals(employee.getId())) {
                throw new AccessDeniedException("You can only cancel reservations for your own sessions");
            }
        }

        if (currentUser.getRole() == Role.MEMBER) {
            Member member = memberRepository.findByUserId(currentUser.getId())
                    .orElseThrow(() -> new NotFoundException("Member not found"));

            if (!reservation.getMember().getId().equals(member.getId())) {
                throw new AccessDeniedException("You can only cancel your own reservations");
            }
        }

        Purchase purchase = reservation.getPurchase();
        purchase.setRemaining(purchase.getRemaining() + 1);

        reservationRepository.delete(reservation);
    }

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public List<Reservation> getReservationsForSession(Long sessionId, String currentUserEmail) {
        TrainingSession session = trainingSessionRepository.findById(sessionId)
                .orElseThrow(() -> new NotFoundException("Training session not found"));

        User currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new NotFoundException("User not found"));

        if (currentUser.getRole() == Role.EMPLOYEE) {
            Employee employee = employeeRepository.findByUserId(currentUser.getId())
                    .orElseThrow(() -> new NotFoundException("Employee not found"));

            if (!session.getEmployee().getId().equals(employee.getId())) {
                throw new AccessDeniedException("You can only view reservations for your own sessions");
            }
        }
        return reservationRepository.findByTrainingSessionId(sessionId);
    }
}

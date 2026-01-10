package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.reservation.CreateReservationRequest;
import com.andrea360.fitnessapp.dto.reservation.ReservationMapper;
import com.andrea360.fitnessapp.dto.reservation.ReservationResponse;
import com.andrea360.fitnessapp.service.reservation.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final ReservationMapper reservationMapper;

    @PreAuthorize("hasAnyRole('MEMBER')")
    @PostMapping
    public ReservationResponse reserve(@Valid @RequestBody CreateReservationRequest request) {
        return reservationMapper.toResponse(
                reservationService.reserveSession(
                        request.getMemberId(),
                        request.getTrainingSessionId()
                )
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @GetMapping("/all")
    public List<ReservationResponse> getAll() {
        return reservationService.getAllReservations()
                .stream()
                .map(reservationMapper::toResponse)
                .toList();
    }

    @PreAuthorize("hasAnyRole('MEMBER')")
    @GetMapping("/member/{memberId}")
    public List<ReservationResponse> getForMember(@PathVariable Long memberId) {
        return reservationService.getReservationsForMember(memberId)
                .stream()
                .map(reservationMapper::toResponse)
                .toList();
    }

    @GetMapping("/available-slots/{trainingSessionId}")
    public int getAvailableSlots(@PathVariable Long trainingSessionId) {
        return reservationService.getAvailableSlots(trainingSessionId);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE', 'MEMBER')")
    @DeleteMapping("/{reservationId}")
    public void cancel(@PathVariable Long reservationId) {
        reservationService.cancelReservation(reservationId);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @GetMapping("/by-session/{sessionId}")
    public List<ReservationResponse> getBySession(@PathVariable Long sessionId, Authentication auth) {
        String email = auth.getName();
        return reservationService.getReservationsForSession(sessionId, email)
                .stream()
                .map(reservationMapper::toResponse)
                .toList();
    }
}

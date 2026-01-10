package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.reservation.*;
import com.andrea360.fitnessapp.model.Member;
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
    private final EmployeeReservationMapper employeeReservationMapper;
    private final MemberReservationMapper memberReservationMapper;

    @PreAuthorize("hasAnyRole('MEMBER')")
    @PostMapping
    public MemberReservationResponse reserve(@Valid @RequestBody CreateReservationRequest request, Authentication auth) {
        String email = auth.getName();
        return memberReservationMapper.toResponse(
                reservationService.reserveSession(
                        email,
                        request.getTrainingSessionId()
                )
        );
    }

    @PreAuthorize("hasRole('MEMBER')")
    @GetMapping("/my-reservations")
    public List<MemberReservationResponse> getMyReservations(Authentication auth) {
        String email = auth.getName();
        return reservationService.getMyReservations(email)
                .stream()
                .map(memberReservationMapper::toResponse)
                .toList();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE', 'MEMBER')")
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
    public List<EmployeeReservationResponse> getBySession(@PathVariable Long sessionId, Authentication auth) {
        String email = auth.getName();
        return reservationService.getReservationsForSession(sessionId, email)
                .stream()
                .map(employeeReservationMapper::toResponse)
                .toList();
    }
}

package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.reservation.CreateReservationRequest;
import com.andrea360.fitnessapp.dto.reservation.ReservationMapper;
import com.andrea360.fitnessapp.dto.reservation.ReservationResponse;
import com.andrea360.fitnessapp.service.reservation.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;
    private final ReservationMapper reservationMapper;

    @PostMapping
    public ReservationResponse reserve(@RequestBody CreateReservationRequest request) {
        return reservationMapper.toResponse(
                reservationService.reserveSession(
                        request.getMemberId(),
                        request.getTrainingSessionId()
                )
        );
    }

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
}

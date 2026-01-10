package com.andrea360.fitnessapp.service.reservation;

import com.andrea360.fitnessapp.model.Reservation;

import java.util.List;

public interface ReservationService {

    Reservation reserveSession(Long memberId, Long trainingSessionId);

    List<Reservation> getReservationsForMember(Long memberId);

    int getAvailableSlots(Long trainingSessionId);

    void cancelReservation(Long reservationId);

    List<Reservation> getAllReservations();

    List<Reservation> getReservationsForSession(Long sessionId, String currentUserEmail);

}

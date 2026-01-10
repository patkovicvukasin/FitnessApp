package com.andrea360.fitnessapp.service.reservation;

import com.andrea360.fitnessapp.model.Reservation;

import java.util.List;

public interface ReservationService {

    Reservation reserveSession(String email, Long trainingSessionId);

    List<Reservation> getMyReservations(String email);

    int getAvailableSlots(Long trainingSessionId);

    void cancelReservation(Long reservationId);

    List<Reservation> getReservationsForSession(Long sessionId, String currentUserEmail);

}

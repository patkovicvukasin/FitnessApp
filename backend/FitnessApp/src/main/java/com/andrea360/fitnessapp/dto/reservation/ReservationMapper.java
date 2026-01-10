package com.andrea360.fitnessapp.dto.reservation;

import com.andrea360.fitnessapp.model.Reservation;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {

    public ReservationResponse toResponse(Reservation reservation) {
        if (reservation == null) {
            return null;
        }

        return new ReservationResponse(
                reservation.getId(),
                reservation.getMember().getFirstName(),
                reservation.getMember().getLastName(),
                reservation.getTrainingSession().getId(),
                reservation.getReservedAt()
        );
    }
}

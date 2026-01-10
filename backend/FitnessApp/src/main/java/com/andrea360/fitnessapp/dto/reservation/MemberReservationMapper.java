package com.andrea360.fitnessapp.dto.reservation;

import com.andrea360.fitnessapp.model.Reservation;
import org.springframework.stereotype.Component;

@Component
public class MemberReservationMapper {

    public MemberReservationResponse toResponse(Reservation reservation) {
        if (reservation == null) {
            return null;
        }

        return new MemberReservationResponse(
                reservation.getId(),
                reservation.getTrainingSession().getTrainingType().getName(),
                reservation.getTrainingSession().getStartTime(),
                reservation.getTrainingSession().getEndTime(),
                reservation.getTrainingSession().getEmployee().getFirstName(),
                reservation.getTrainingSession().getEmployee().getLastName(),
                reservation.getTrainingSession().getLocation().getName(),
                reservation.getReservedAt()
        );
    }
}
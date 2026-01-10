package com.andrea360.fitnessapp.dto.trainingSession;

import com.andrea360.fitnessapp.model.TrainingSession;
import com.andrea360.fitnessapp.repository.ReservationRepository;
import org.springframework.stereotype.Component;

@Component
public class TrainingSessionMapper {

    private final ReservationRepository reservationRepository;

    public TrainingSessionMapper(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public TrainingSessionResponse toResponse(TrainingSession session) {
        if (session == null) {
            return null;
        }

        int reservedCount = reservationRepository.countByTrainingSessionId(session.getId());
        int availableSlots = session.getMaxCapacity() - reservedCount;

        return new TrainingSessionResponse(
                session.getId(),
                session.getStartTime(),
                session.getEndTime(),
                session.getMaxCapacity(),
                session.getLocation().getName(),
                session.getLocation().getAddress(),
                session.getTrainingType().getName(),
                session.getEmployee().getFirstName(),
                session.getEmployee().getLastName(),
                availableSlots
        );
    }
}

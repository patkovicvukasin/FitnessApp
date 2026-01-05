package com.andrea360.fitnessapp.dto.trainingSession;

import com.andrea360.fitnessapp.model.TrainingSession;
import org.springframework.stereotype.Component;

@Component
public class TrainingSessionMapper {

    public TrainingSessionResponse toResponse(TrainingSession session) {
        if (session == null) {
            return null;
        }

        return new TrainingSessionResponse(
                session.getId(),
                session.getStartTime(),
                session.getEndTime(),
                session.getMaxCapacity(),
                session.getLocation().getId(),
                session.getTrainingType().getId(),
                session.getEmployee().getId()
        );
    }
}

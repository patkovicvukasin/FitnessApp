package com.andrea360.fitnessapp.dto.trainingType;

import com.andrea360.fitnessapp.model.TrainingType;
import org.springframework.stereotype.Component;

@Component
public class TrainingTypeMapper {

    public TrainingTypeResponse toResponse(TrainingType trainingType) {
        if (trainingType == null) {
            return null;
        }

        return new TrainingTypeResponse(
                trainingType.getId(),
                trainingType.getName(),
                trainingType.getPrice()
        );
    }
}

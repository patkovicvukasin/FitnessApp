package com.andrea360.fitnessapp.dto.trainingSession;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateTrainingSessionRequest {

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int maxCapacity;
    private Long locationId;
    private Long trainingTypeId;
    private Long employeeId;
}

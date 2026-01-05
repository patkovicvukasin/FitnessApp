package com.andrea360.fitnessapp.dto.trainingSession;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainingSessionResponse {

    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int maxCapacity;

    private Long locationId;
    private Long trainingTypeId;
    private Long employeeId;
}

package com.andrea360.fitnessapp.dto.trainingSession;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateTrainingSessionRequest {

    @NotNull(message = "Start time is required")
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    private LocalDateTime endTime;

    @Positive(message = "Max capacity must be greater than zero")
    private int maxCapacity;

    @NotNull(message = "Location ID is required")
    private Long locationId;

    @NotNull(message = "Training type ID is required")
    private Long trainingTypeId;

    @NotNull(message = "Employee ID is required")
    private Long employeeId;
}

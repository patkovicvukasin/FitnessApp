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

    private String locationName;
    private String locationAddress;
    private String trainingTypeName;

    private String employeeFirstName;
    private String employeeLastName;

    private int availableSlots;
}

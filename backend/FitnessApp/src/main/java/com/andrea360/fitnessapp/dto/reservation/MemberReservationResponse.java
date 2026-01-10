package com.andrea360.fitnessapp.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberReservationResponse {
    private Long id;

    private String trainingTypeName;
    private LocalDateTime sessionStartTime;
    private LocalDateTime sessionEndTime;

    private String employeeFirstName;
    private String employeeLastName;

    private String locationName;

    private LocalDateTime reservedAt;
}

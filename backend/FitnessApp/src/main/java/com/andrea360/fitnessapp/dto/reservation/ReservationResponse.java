package com.andrea360.fitnessapp.dto.reservation;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {

    private Long id;
    private String memberFirstName;
    private String memberLastName;
    private Long trainingSessionId;
    private LocalDateTime reservedAt;
}

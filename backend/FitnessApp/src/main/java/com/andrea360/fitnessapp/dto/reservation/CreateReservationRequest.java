package com.andrea360.fitnessapp.dto.reservation;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateReservationRequest {

    private Long memberId;
    private Long trainingSessionId;
}

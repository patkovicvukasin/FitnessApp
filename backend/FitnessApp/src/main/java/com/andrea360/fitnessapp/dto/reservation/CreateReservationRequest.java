package com.andrea360.fitnessapp.dto.reservation;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateReservationRequest {

    @NotNull(message = "Training session ID is required")
    private Long trainingSessionId;
}

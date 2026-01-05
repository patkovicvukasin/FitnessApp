package com.andrea360.fitnessapp.dto.trainingType;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainingTypeResponse {

    private Long id;
    private String name;
    private BigDecimal price;
}

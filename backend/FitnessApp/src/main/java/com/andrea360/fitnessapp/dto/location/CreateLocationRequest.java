package com.andrea360.fitnessapp.dto.location;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateLocationRequest {

    @NotBlank(message = "Location name is required")
    private String name;

    @NotBlank(message = "Location address is required")
    private String address;
}
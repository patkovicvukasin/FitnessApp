package com.andrea360.fitnessapp.dto.location;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateLocationRequest {
    private String name;
    private String address;
}
package com.andrea360.fitnessapp.dto.employee;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private Long locationId;
}

package com.andrea360.fitnessapp.dto.employee;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateEmployeeRequest {

    private String firstName;
    private String lastName;
    private Long locationId;
    private String email;
    private String password;
}

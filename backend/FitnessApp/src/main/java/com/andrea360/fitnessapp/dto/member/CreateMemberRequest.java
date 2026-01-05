package com.andrea360.fitnessapp.dto.member;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMemberRequest {

    private String firstName;
    private String lastName;
    private Long locationId;
    private String email;
    private String password;
}

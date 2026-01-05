package com.andrea360.fitnessapp.dto.member;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private Long locationId;
}

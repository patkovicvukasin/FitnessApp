package com.andrea360.fitnessapp.dto.member;

import com.andrea360.fitnessapp.model.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

    public MemberResponse toResponse(Member member) {
        if (member == null) {
            return null;
        }

        return new MemberResponse(
                member.getId(),
                member.getFirstName(),
                member.getLastName(),
                member.getLocation().getId()
        );
    }
}

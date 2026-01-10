package com.andrea360.fitnessapp.service.member;

import com.andrea360.fitnessapp.model.Member;
import java.util.List;
import java.util.Optional;

public interface MemberService {

    Member createMember(
            String firstName,
            String lastName,
            Long locationId,
            String email,
            String password
    );

    Member getById(Long id);

    List<Member> getByLocation(Long locationId);

    Optional<Member> findByUserId(Long id);

    List<Member> getAll();
}


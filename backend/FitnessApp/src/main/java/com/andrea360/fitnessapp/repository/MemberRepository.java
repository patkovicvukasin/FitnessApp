package com.andrea360.fitnessapp.repository;

import com.andrea360.fitnessapp.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findByLocationId(Long locationId);
}

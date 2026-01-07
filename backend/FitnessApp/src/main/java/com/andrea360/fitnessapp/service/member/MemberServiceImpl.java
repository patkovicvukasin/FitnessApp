package com.andrea360.fitnessapp.service.member;

import com.andrea360.fitnessapp.exception.common.NotFoundException;
import com.andrea360.fitnessapp.model.Location;
import com.andrea360.fitnessapp.model.Member;
import com.andrea360.fitnessapp.model.Role;
import com.andrea360.fitnessapp.model.User;
import com.andrea360.fitnessapp.repository.MemberRepository;
import com.andrea360.fitnessapp.service.location.LocationService;
import com.andrea360.fitnessapp.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final LocationService locationService;
    private final UserService userService;

    @Override
    public Member createMember(
            String firstName,
            String lastName,
            Long locationId,
            String email,
            String password
    ) {
        Location location = locationService.getById(locationId);

        User user = userService.createUser(email, password, Role.MEMBER);

        Member member = new Member();
        member.setFirstName(firstName);
        member.setLastName(lastName);
        member.setLocation(location);
        member.setUser(user);

        return memberRepository.save(member);
    }

    @Override
    public Member getById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Member not found"));
    }

    @Override
    public List<Member> getByLocation(Long locationId) {
        return memberRepository.findByLocationId(locationId);
    }

    @Override
    public Optional<Member> findByUserId(Long userId) {
        return memberRepository.findByUserId(userId);
    }
}

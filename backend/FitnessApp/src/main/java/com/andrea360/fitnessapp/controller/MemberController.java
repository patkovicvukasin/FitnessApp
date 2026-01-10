package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.employee.EmployeeResponse;
import com.andrea360.fitnessapp.dto.member.CreateMemberRequest;
import com.andrea360.fitnessapp.dto.member.MemberMapper;
import com.andrea360.fitnessapp.dto.member.MemberResponse;
import com.andrea360.fitnessapp.service.member.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @PostMapping
    public MemberResponse create(@Valid @RequestBody CreateMemberRequest request) {
        return memberMapper.toResponse(
                memberService.createMember(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getLocationId(),
                        request.getEmail(),
                        request.getPassword()
                )
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @GetMapping("/{id}")
    public MemberResponse getById(@PathVariable Long id) {
        return memberMapper.toResponse(
                memberService.getById(id)
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/by-location/{locationId}")
    public List<MemberResponse> getByLocation(@PathVariable Long locationId) {
        return memberService.getByLocation(locationId)
                .stream()
                .map(memberMapper::toResponse)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<MemberResponse> getAll() {
        return memberService.getAll()
                .stream()
                .map(memberMapper::toResponse)
                .toList();
    }
}

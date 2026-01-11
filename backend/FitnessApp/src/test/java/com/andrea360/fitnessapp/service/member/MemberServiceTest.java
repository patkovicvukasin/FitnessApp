package com.andrea360.fitnessapp.service.member;

import com.andrea360.fitnessapp.model.Location;
import com.andrea360.fitnessapp.model.Member;
import com.andrea360.fitnessapp.model.Role;
import com.andrea360.fitnessapp.model.User;
import com.andrea360.fitnessapp.repository.MemberRepository;
import com.andrea360.fitnessapp.service.location.LocationService;
import com.andrea360.fitnessapp.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private LocationService locationService;

    @Mock
    private UserService userService;

    @InjectMocks
    private MemberServiceImpl memberService;

    private Location testLocation;
    private User testUser;

    @BeforeEach
    void setUp() {
        testLocation = new Location();
        testLocation.setId(1L);
        testLocation.setName("Test Gym");
        testLocation.setAddress("Test Address");

        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("test@example.com");
        testUser.setRole(Role.MEMBER);
    }

    @Test
    void createMember_Success() {
        String firstName = "John";
        String lastName = "Doe";
        Long locationId = 1L;
        String email = "john@example.com";
        String password = "password123";

        when(locationService.getById(locationId)).thenReturn(testLocation);
        when(userService.createUser(email, password, Role.MEMBER)).thenReturn(testUser);

        Member savedMember = new Member();
        savedMember.setId(1L);
        savedMember.setFirstName(firstName);
        savedMember.setLastName(lastName);
        savedMember.setLocation(testLocation);
        savedMember.setUser(testUser);

        when(memberRepository.save(any(Member.class))).thenReturn(savedMember);

        Member result = memberService.createMember(firstName, lastName, locationId, email, password);

        assertNotNull(result);
        assertEquals(firstName, result.getFirstName());
        assertEquals(lastName, result.getLastName());
        assertEquals(testLocation, result.getLocation());
        assertEquals(testUser, result.getUser());

        verify(locationService, times(1)).getById(locationId);
        verify(userService, times(1)).createUser(email, password, Role.MEMBER);
        verify(memberRepository, times(1)).save(any(Member.class));
    }
}
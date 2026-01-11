package com.andrea360.fitnessapp.service.reservation;

import com.andrea360.fitnessapp.exception.reservation.NoRemainingCreditsException;
import com.andrea360.fitnessapp.exception.reservation.SessionAlreadyReservedException;
import com.andrea360.fitnessapp.exception.reservation.SessionFullException;
import com.andrea360.fitnessapp.model.*;
import com.andrea360.fitnessapp.repository.*;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private TrainingSessionRepository trainingSessionRepository;

    @Mock
    private PurchaseRepository purchaseRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private EntityManager entityManager;

    @InjectMocks
    private ReservationServiceImpl reservationService;

    private User testUser;
    private Member testMember;
    private TrainingSession testSession;
    private TrainingType testTrainingType;
    private Purchase testPurchase;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("member@test.com");

        testMember = new Member();
        testMember.setId(1L);
        testMember.setUser(testUser);

        testTrainingType = new TrainingType();
        testTrainingType.setId(1L);
        testTrainingType.setName("Yoga");

        testSession = new TrainingSession();
        testSession.setId(1L);
        testSession.setMaxCapacity(10);
        testSession.setTrainingType(testTrainingType);
        testSession.setStartTime(LocalDateTime.now().plusDays(1));
        testSession.setEndTime(LocalDateTime.now().plusDays(1).plusHours(1));

        testPurchase = new Purchase();
        testPurchase.setId(1L);
        testPurchase.setMember(testMember);
        testPurchase.setTrainingType(testTrainingType);
        testPurchase.setRemaining(5);
    }

    @Test
    void reserveSession_Success() {
        String email = "member@test.com";
        Long sessionId = 1L;

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));
        when(memberRepository.findByUserId(testUser.getId())).thenReturn(Optional.of(testMember));
        when(trainingSessionRepository.findById(sessionId)).thenReturn(Optional.of(testSession));
        when(reservationRepository.existsByMemberIdAndTrainingSessionId(testMember.getId(), sessionId))
                .thenReturn(false);
        when(reservationRepository.existsByMemberIdAndTrainingSession_StartTimeLessThanAndTrainingSession_EndTimeGreaterThan(
                anyLong(), any(), any())).thenReturn(false);
        when(reservationRepository.countByTrainingSessionId(sessionId)).thenReturn(5);
        when(purchaseRepository.findFirstByMemberIdAndTrainingTypeIdAndRemainingGreaterThanOrderByPurchasedAtAsc(
                testMember.getId(), testTrainingType.getId(), 0))
                .thenReturn(Optional.of(testPurchase));

        Reservation savedReservation = new Reservation();
        savedReservation.setId(1L);
        when(reservationRepository.save(any(Reservation.class))).thenReturn(savedReservation);

        Reservation result = reservationService.reserveSession(email, sessionId);

        assertNotNull(result);
        assertEquals(4, testPurchase.getRemaining());
        verify(reservationRepository, times(1)).save(any(Reservation.class));
        verify(entityManager, times(1)).flush();
    }

    @Test
    void reserveSession_ThrowsSessionAlreadyReservedException() {
        String email = "member@test.com";
        Long sessionId = 1L;

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));
        when(memberRepository.findByUserId(testUser.getId())).thenReturn(Optional.of(testMember));
        when(trainingSessionRepository.findById(sessionId)).thenReturn(Optional.of(testSession));
        when(reservationRepository.existsByMemberIdAndTrainingSessionId(testMember.getId(), sessionId))
                .thenReturn(true);

        assertThrows(SessionAlreadyReservedException.class, () -> {
            reservationService.reserveSession(email, sessionId);
        });
    }

    @Test
    void reserveSession_ThrowsSessionFullException() {
        String email = "member@test.com";
        Long sessionId = 1L;

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));
        when(memberRepository.findByUserId(testUser.getId())).thenReturn(Optional.of(testMember));
        when(trainingSessionRepository.findById(sessionId)).thenReturn(Optional.of(testSession));
        when(reservationRepository.existsByMemberIdAndTrainingSessionId(testMember.getId(), sessionId))
                .thenReturn(false);
        when(reservationRepository.existsByMemberIdAndTrainingSession_StartTimeLessThanAndTrainingSession_EndTimeGreaterThan(
                anyLong(), any(), any())).thenReturn(false);
        when(reservationRepository.countByTrainingSessionId(sessionId)).thenReturn(10);

        assertThrows(SessionFullException.class, () -> {
            reservationService.reserveSession(email, sessionId);
        });
    }

    @Test
    void reserveSession_ThrowsNoRemainingCreditsException() {
        String email = "member@test.com";
        Long sessionId = 1L;

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(testUser));
        when(memberRepository.findByUserId(testUser.getId())).thenReturn(Optional.of(testMember));
        when(trainingSessionRepository.findById(sessionId)).thenReturn(Optional.of(testSession));
        when(reservationRepository.existsByMemberIdAndTrainingSessionId(testMember.getId(), sessionId))
                .thenReturn(false);
        when(reservationRepository.existsByMemberIdAndTrainingSession_StartTimeLessThanAndTrainingSession_EndTimeGreaterThan(
                anyLong(), any(), any())).thenReturn(false);
        when(reservationRepository.countByTrainingSessionId(sessionId)).thenReturn(5);
        when(purchaseRepository.findFirstByMemberIdAndTrainingTypeIdAndRemainingGreaterThanOrderByPurchasedAtAsc(
                testMember.getId(), testTrainingType.getId(), 0))
                .thenReturn(Optional.empty()); // No credits

        assertThrows(NoRemainingCreditsException.class, () -> {
            reservationService.reserveSession(email, sessionId);
        });
    }
}
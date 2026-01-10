package com.andrea360.fitnessapp.repository;

import com.andrea360.fitnessapp.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByMemberId(Long memberId);

    int countByTrainingSessionId(Long trainingSessionId);

    boolean existsByMemberIdAndTrainingSessionId(Long memberId, Long trainingSessionId);

    boolean existsByMemberIdAndTrainingSession_StartTimeLessThanAndTrainingSession_EndTimeGreaterThan(
            Long memberId,
            LocalDateTime endTime,
            LocalDateTime startTime
    );

    List<Reservation> findByTrainingSessionId(Long trainingSessionId);
}

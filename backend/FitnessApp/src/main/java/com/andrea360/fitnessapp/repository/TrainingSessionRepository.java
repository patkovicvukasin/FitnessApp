package com.andrea360.fitnessapp.repository;

import com.andrea360.fitnessapp.model.TrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TrainingSessionRepository extends JpaRepository<TrainingSession, Long> {
    List<TrainingSession> findByLocationId(Long locationId);

    boolean existsByEmployeeIdAndStartTimeLessThanAndEndTimeGreaterThan(
            Long employeeId,
            LocalDateTime endTime,
            LocalDateTime startTime
    );
}

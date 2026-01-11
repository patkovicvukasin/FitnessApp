package com.andrea360.fitnessapp.repository;

import com.andrea360.fitnessapp.model.TrainingSession;
import com.andrea360.fitnessapp.model.TrainingType;
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

    List<TrainingSession> findByEmployeeId(Long employeeId);

    List<TrainingSession> findByTrainingType(TrainingType trainingType);
}

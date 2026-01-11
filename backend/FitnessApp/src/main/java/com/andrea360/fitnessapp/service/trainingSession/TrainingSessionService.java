package com.andrea360.fitnessapp.service.trainingSession;

import com.andrea360.fitnessapp.model.TrainingSession;
import java.time.LocalDateTime;
import java.util.List;

public interface TrainingSessionService {

    TrainingSession createSession(
            LocalDateTime startTime,
            LocalDateTime endTime,
            int maxCapacity,
            Long locationId,
            Long serviceId,
            Long employeeId,
            String currentUserEmail
    );

    TrainingSession getById(Long id);

    List<TrainingSession> getByLocation(Long locationId);

    List<TrainingSession> getByEmployee(Long employeeId);

    List<TrainingSession> getMySessionsForEmployee(String email);

    List<TrainingSession> getAllSessions();

    List<TrainingSession> getByTrainingType(Long trainingTypeId);

    void deleteSession(Long sessionId);
}


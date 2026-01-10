package com.andrea360.fitnessapp.service.trainingSession;

import com.andrea360.fitnessapp.exception.common.BadRequestException;
import com.andrea360.fitnessapp.exception.common.NotFoundException;
import com.andrea360.fitnessapp.model.*;
import com.andrea360.fitnessapp.repository.EmployeeRepository;
import com.andrea360.fitnessapp.repository.TrainingSessionRepository;
import com.andrea360.fitnessapp.repository.UserRepository;
import com.andrea360.fitnessapp.service.employee.EmployeeService;
import com.andrea360.fitnessapp.service.trainingType.TrainingTypeService;
import com.andrea360.fitnessapp.service.location.LocationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TrainingSessionServiceImpl implements TrainingSessionService {

    private final TrainingSessionRepository trainingSessionRepository;
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final LocationService locationService;
    private final TrainingTypeService trainingTypeService;
    private final EmployeeService employeeService;

    @Override
    public TrainingSession createSession(
            LocalDateTime startTime,
            LocalDateTime endTime,
            int maxCapacity,
            Long locationId,
            Long serviceId,
            Long employeeId
    ) {
        if (!endTime.isAfter(startTime)) {
            throw new BadRequestException("End time must be after start time");
        }

        if (trainingSessionRepository
                .existsByEmployeeIdAndStartTimeLessThanAndEndTimeGreaterThan(
                        employeeId,
                        endTime,
                        startTime
                )) {
            throw new BadRequestException(
                    "Employee already has a session in the given time range"
            );
        }

        Location location = locationService.getById(locationId);
        TrainingType trainingType = trainingTypeService.getById(serviceId);
        Employee employee = employeeService.getById(employeeId);

        TrainingSession session = new TrainingSession();
        session.setStartTime(startTime);
        session.setEndTime(endTime);
        session.setMaxCapacity(maxCapacity);
        session.setLocation(location);
        session.setTrainingType(trainingType);
        session.setEmployee(employee);

        return trainingSessionRepository.save(session);
    }

    @Override
    public TrainingSession getById(Long id) {
        return trainingSessionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Training session not found"));
    }

    @Override
    public List<TrainingSession> getByLocation(Long locationId) {
        return trainingSessionRepository.findByLocationId(locationId);
    }

    @Override
    public List<TrainingSession> getByEmployee(Long employeeId) {
        return trainingSessionRepository.findByEmployeeId(employeeId);
    }

    @Override
    public List<TrainingSession> getMySessionsForEmployee(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Employee employee = employeeRepository.findByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException("Employee not found"));

        return trainingSessionRepository.findByEmployeeId(employee.getId());
    }
}

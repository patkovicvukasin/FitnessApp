package com.andrea360.fitnessapp.service.trainingSession;

import com.andrea360.fitnessapp.model.Employee;
import com.andrea360.fitnessapp.model.TrainingType;
import com.andrea360.fitnessapp.model.Location;
import com.andrea360.fitnessapp.model.TrainingSession;
import com.andrea360.fitnessapp.repository.TrainingSessionRepository;
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
            throw new IllegalArgumentException("End time must be after start time");
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
                .orElseThrow(() -> new IllegalArgumentException("Training session not found"));
    }

    @Override
    public List<TrainingSession> getByLocation(Long locationId) {
        return trainingSessionRepository.findByLocationId(locationId);
    }
}

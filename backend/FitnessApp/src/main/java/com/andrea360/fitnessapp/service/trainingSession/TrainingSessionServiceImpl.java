package com.andrea360.fitnessapp.service.trainingSession;

import com.andrea360.fitnessapp.exception.auth.AccessDeniedException;
import com.andrea360.fitnessapp.exception.common.BadRequestException;
import com.andrea360.fitnessapp.exception.common.NotFoundException;
import com.andrea360.fitnessapp.model.*;
import com.andrea360.fitnessapp.repository.*;
import com.andrea360.fitnessapp.service.trainingType.TrainingTypeService;
import com.andrea360.fitnessapp.service.location.LocationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    private final TrainingTypeRepository trainingTypeRepository;
    private final PurchaseRepository purchaseRepository;
    private final ReservationRepository reservationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public TrainingSession createSession(
            LocalDateTime startTime,
            LocalDateTime endTime,
            int maxCapacity,
            Long locationId,
            Long serviceId,
            Long employeeId,
            String currentUserEmail
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
        Employee employee;

        if (employeeId == null || employeeId == 0) {
            User currentUser = userRepository.findByEmail(currentUserEmail)
                    .orElseThrow(() -> new NotFoundException("User not found"));

            if (currentUser.getRole() != Role.EMPLOYEE && currentUser.getRole() != Role.ADMIN) {
                throw new AccessDeniedException("Only employees can create sessions");
            }

            employee = employeeRepository.findByUserId(currentUser.getId())
                    .orElseThrow(() -> new NotFoundException("Employee profile not found"));
        } else {
            employee = employeeRepository.findById(employeeId)
                    .orElseThrow(() -> new NotFoundException("Employee not found"));
        }

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

    @Override
    public List<TrainingSession> getAllSessions() {
        return trainingSessionRepository.findAll();
    }

    @Override
    public List<TrainingSession> getByTrainingType(Long trainingTypeId) {
        TrainingType trainingType = trainingTypeRepository.findById(trainingTypeId)
                .orElseThrow(() -> new NotFoundException("Training type not found"));
        return trainingSessionRepository.findByTrainingType(trainingType);
    }

    @Override
    public void deleteSession(Long sessionId) {
        TrainingSession session = getById(sessionId);

        List<Reservation> reservations = reservationRepository.findByTrainingSessionId(sessionId);

        for (Reservation reservation : reservations) {
            Purchase purchase = reservation.getPurchase();
            purchase.setRemaining(purchase.getRemaining() + 1);
            purchaseRepository.save(purchase);
            reservationRepository.delete(reservation);
        }

        trainingSessionRepository.delete(session);

        messagingTemplate.convertAndSend(
                "/topic/sessions/" + sessionId + "/deleted",
                sessionId
        );
    }
}

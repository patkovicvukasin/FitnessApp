package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.trainingSession.CreateTrainingSessionRequest;
import com.andrea360.fitnessapp.dto.trainingSession.TrainingSessionMapper;
import com.andrea360.fitnessapp.dto.trainingSession.TrainingSessionResponse;
import com.andrea360.fitnessapp.service.trainingSession.TrainingSessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-sessions")
@RequiredArgsConstructor
public class TrainingSessionController {

    private final TrainingSessionService trainingSessionService;
    private final TrainingSessionMapper trainingSessionMapper;

    @PreAuthorize("hasAnyRole('ADMIN', 'EMPLOYEE')")
    @PostMapping
    public TrainingSessionResponse create(@Valid @RequestBody CreateTrainingSessionRequest request) {
        return trainingSessionMapper.toResponse(
                trainingSessionService.createSession(
                        request.getStartTime(),
                        request.getEndTime(),
                        request.getMaxCapacity(),
                        request.getLocationId(),
                        request.getTrainingTypeId(),
                        request.getEmployeeId()
                )
        );
    }

    //da kada employee pritisne na svoju sesiju vidi spisak rezervacija za sesiju
    // (ne treba da ostane public)
    @GetMapping("/{id}")
    public TrainingSessionResponse getById(@PathVariable Long id) {
        return trainingSessionMapper.toResponse(
                trainingSessionService.getById(id)
        );
    }

    //kada koirsnik izabere tip treninga valjda ovaj endpoint treba da mu dovuce dostupne sesije
    //ali mora onda da se doda u ovaj upit da se trazi po tipu treninga
    @GetMapping("/by-location/{locationId}")
    public List<TrainingSessionResponse> getByLocation(@PathVariable Long locationId) {
        return trainingSessionService.getByLocation(locationId)
                .stream()
                .map(trainingSessionMapper::toResponse)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/by-employee/{employeeId}")
    public List<TrainingSessionResponse> getByEmployee(@PathVariable Long employeeId) {
        return trainingSessionService.getByEmployee(employeeId)
                .stream()
                .map(trainingSessionMapper::toResponse)
                .toList();
    }

    //da zaposleni vidi spisak svojih sesija i da vidi br preostalih mesta
}

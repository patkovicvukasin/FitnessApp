package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.trainingType.CreateTrainingTypeRequest;
import com.andrea360.fitnessapp.dto.trainingType.TrainingTypeMapper;
import com.andrea360.fitnessapp.dto.trainingType.TrainingTypeResponse;
import com.andrea360.fitnessapp.service.trainingType.TrainingTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-types")
@RequiredArgsConstructor
public class TrainingTypeController {

    private final TrainingTypeService trainingTypeService;
    private final TrainingTypeMapper trainingTypeMapper;

    @PostMapping
    public TrainingTypeResponse create(@Valid @RequestBody CreateTrainingTypeRequest request) {
        return trainingTypeMapper.toResponse(
                trainingTypeService.createService(
                        request.getName(),
                        request.getPrice()
                )
        );
    }

    @GetMapping("/{id}")
    public TrainingTypeResponse getById(@PathVariable Long id) {
        return trainingTypeMapper.toResponse(
                trainingTypeService.getById(id)
        );
    }

    @GetMapping
    public List<TrainingTypeResponse> getAll() {
        return trainingTypeService.getAll()
                .stream()
                .map(trainingTypeMapper::toResponse)
                .toList();
    }
}

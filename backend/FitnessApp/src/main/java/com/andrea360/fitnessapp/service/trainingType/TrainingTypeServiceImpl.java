package com.andrea360.fitnessapp.service.trainingType;

import com.andrea360.fitnessapp.model.TrainingType;
import com.andrea360.fitnessapp.repository.TrainingTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingTypeServiceImpl implements TrainingTypeService {

    private final TrainingTypeRepository trainingTypeRepository;

    @Override
    public TrainingType createService(String name, BigDecimal price) {
        TrainingType service = new TrainingType();
        service.setName(name);
        service.setPrice(price);
        return trainingTypeRepository.save(service);
    }

    @Override
    public TrainingType getById(Long id) {
        return trainingTypeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Fitness service not found"));
    }

    @Override
    public List<TrainingType> getAll() {
        return trainingTypeRepository.findAll();
    }
}

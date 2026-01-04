package com.andrea360.fitnessapp.service.trainingType;

import com.andrea360.fitnessapp.model.TrainingType;
import java.math.BigDecimal;
import java.util.List;

public interface TrainingTypeService {

    TrainingType createService(String name, BigDecimal price);

    TrainingType getById(Long id);

    List<TrainingType> getAll();
}

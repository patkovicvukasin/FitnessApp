package com.andrea360.fitnessapp.repository;

import com.andrea360.fitnessapp.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
}

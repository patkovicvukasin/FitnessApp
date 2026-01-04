package com.andrea360.fitnessapp.repository;

import com.andrea360.fitnessapp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByLocationId(Long locationId);
}

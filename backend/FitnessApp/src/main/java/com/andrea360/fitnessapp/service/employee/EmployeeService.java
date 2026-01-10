package com.andrea360.fitnessapp.service.employee;

import com.andrea360.fitnessapp.model.Employee;
import java.util.List;

public interface EmployeeService {

    Employee createEmployee(
            String firstName,
            String lastName,
            Long locationId,
            String email,
            String password
    );

    Employee getById(Long id);

    List<Employee> getByLocation(Long locationId);

    List<Employee> getAll();
}


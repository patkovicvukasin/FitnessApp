package com.andrea360.fitnessapp.service.employee;

import com.andrea360.fitnessapp.model.Employee;
import com.andrea360.fitnessapp.model.Location;
import com.andrea360.fitnessapp.model.Role;
import com.andrea360.fitnessapp.model.User;
import com.andrea360.fitnessapp.repository.EmployeeRepository;
import com.andrea360.fitnessapp.service.location.LocationService;
import com.andrea360.fitnessapp.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final LocationService locationService;
    private final UserService userService;

    @Override
    public Employee createEmployee(
            String firstName,
            String lastName,
            Long locationId,
            String email,
            String password
    ) {
        Location location = locationService.getById(locationId);

        User user = userService.createUser(email, password, Role.EMPLOYEE);

        Employee employee = new Employee();
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setLocation(location);
        employee.setUser(user);

        return employeeRepository.save(employee);
    }

    @Override
    public Employee getById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
    }

    @Override
    public List<Employee> getByLocation(Long locationId) {
        return employeeRepository.findByLocationId(locationId);
    }
}

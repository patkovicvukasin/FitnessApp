package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.employee.CreateEmployeeRequest;
import com.andrea360.fitnessapp.dto.employee.EmployeeMapper;
import com.andrea360.fitnessapp.dto.employee.EmployeeResponse;
import com.andrea360.fitnessapp.service.employee.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;
    private final EmployeeMapper employeeMapper;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public EmployeeResponse create(@Valid @RequestBody CreateEmployeeRequest request) {
        return employeeMapper.toResponse(
                employeeService.createEmployee(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getLocationId(),
                        request.getEmail(),
                        request.getPassword()
                )
        );
    }

//    @PreAuthorize("hasAnyRole('ADMIN')")
//    @GetMapping("/{id}")
//    public EmployeeResponse getById(@PathVariable Long id) {
//        return employeeMapper.toResponse(
//                employeeService.getById(id)
//        );
//    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/by-location/{locationId}")
    public List<EmployeeResponse> getByLocation(@PathVariable Long locationId) {
        return employeeService.getByLocation(locationId)
                .stream()
                .map(employeeMapper::toResponse)
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<EmployeeResponse> getAll() {
        return employeeService.getAll()
                .stream()
                .map(employeeMapper::toResponse)
                .toList();
    }
}

package com.andrea360.fitnessapp.controller;

import com.andrea360.fitnessapp.dto.location.CreateLocationRequest;
import com.andrea360.fitnessapp.dto.location.LocationMapper;
import com.andrea360.fitnessapp.dto.location.LocationResponse;
import com.andrea360.fitnessapp.service.location.LocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;
    private final LocationMapper locationMapper;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public LocationResponse create(@Valid @RequestBody CreateLocationRequest request) {
        return locationMapper.toResponse(
                locationService.createLocation(
                        request.getName(),
                        request.getAddress()
                )
        );
    }

    @GetMapping("/{id}")
    public LocationResponse getById(@PathVariable Long id) {
        return locationMapper.toResponse(
                locationService.getById(id)
        );
    }

    @GetMapping
    public List<LocationResponse> getAll() {
        return locationService.getAll()
                .stream()
                .map(locationMapper::toResponse)
                .toList();
    }
}

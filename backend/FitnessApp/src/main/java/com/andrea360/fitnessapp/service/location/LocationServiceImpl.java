package com.andrea360.fitnessapp.service.location;

import com.andrea360.fitnessapp.exception.common.NotFoundException;
import com.andrea360.fitnessapp.model.Location;
import com.andrea360.fitnessapp.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    @Override
    public Location createLocation(String name, String address) {
        Location location = new Location();
        location.setName(name);
        location.setAddress(address);
        return locationRepository.save(location);
    }

    @Override
    public Location getById(Long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Location not found"));
    }

    @Override
    public List<Location> getAll() {
        return locationRepository.findAll();
    }
}

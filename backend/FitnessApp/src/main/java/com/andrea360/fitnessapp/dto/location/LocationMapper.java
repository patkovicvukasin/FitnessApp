package com.andrea360.fitnessapp.dto.location;

import com.andrea360.fitnessapp.model.Location;
import org.springframework.stereotype.Component;

@Component
public class LocationMapper {

    public LocationResponse toResponse(Location location) {
        if (location == null) {
            return null;
        }

        return new LocationResponse(
                location.getId(),
                location.getName(),
                location.getAddress()
        );
    }
}

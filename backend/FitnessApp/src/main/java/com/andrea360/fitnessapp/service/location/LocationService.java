package com.andrea360.fitnessapp.service.location;

import com.andrea360.fitnessapp.model.Location;
import java.util.List;

public interface LocationService {

    Location createLocation(String name, String address);

    Location getById(Long id);

    List<Location> getAll();
}


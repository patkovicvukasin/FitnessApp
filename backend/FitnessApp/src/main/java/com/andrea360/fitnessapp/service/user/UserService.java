package com.andrea360.fitnessapp.service.user;

import com.andrea360.fitnessapp.model.Role;
import com.andrea360.fitnessapp.model.User;

import java.util.Optional;

public interface UserService {

    User createUser(String email, String password, Role role);

    Optional<User> findByEmail(String email);

    User getById(Long id);
}

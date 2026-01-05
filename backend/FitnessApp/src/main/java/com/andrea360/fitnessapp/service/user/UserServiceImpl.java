package com.andrea360.fitnessapp.service.user;

import com.andrea360.fitnessapp.exception.common.BadRequestException;
import com.andrea360.fitnessapp.exception.common.NotFoundException;
import com.andrea360.fitnessapp.model.Role;
import com.andrea360.fitnessapp.model.User;
import com.andrea360.fitnessapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User createUser(String email, String password, Role role) {
        if(email == null || email.isBlank()){
            throw new BadRequestException("Email is required.");
        }
        if(password == null || password.isBlank()){
            throw new BadRequestException("Password is required.");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new BadRequestException("Email is already in use");
        }
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }
}

package com.andrea360.fitnessapp.service.user;

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
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}

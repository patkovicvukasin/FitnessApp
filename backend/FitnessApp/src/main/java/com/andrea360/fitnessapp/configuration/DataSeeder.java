package com.andrea360.fitnessapp.configuration;

import com.andrea360.fitnessapp.model.*;
import com.andrea360.fitnessapp.repository.TrainingSessionRepository;
import com.andrea360.fitnessapp.repository.TrainingTypeRepository;
import com.andrea360.fitnessapp.repository.UserRepository;
import com.andrea360.fitnessapp.service.employee.EmployeeService;
import com.andrea360.fitnessapp.service.location.LocationService;
import com.andrea360.fitnessapp.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    private final LocationService locationService;
    private final EmployeeService employeeService;
    private final MemberService memberService;
    private final TrainingTypeRepository trainingTypeRepository;
    private final TrainingSessionRepository trainingSessionRepository;
    private final UserRepository userRepository;

    @Bean
    public CommandLineRunner seedDatabase() {
        return args -> {
            Location location1 = locationService.createLocation(
                    "Teretana Liman",
                    "Fruškogorska 11"
            );

            Location location2 = locationService.createLocation(
                    "Teretana Detelinara",
                    "Bulevar Evrope 45"
            );

            Employee employee1 = employeeService.createEmployee(
                    "Nikola",
                    "Stojanović",
                    location1.getId(),
                    "employee1@test.com",
                    "employee123"
            );

            Employee employee2 = employeeService.createEmployee(
                    "Marko",
                    "Petrović",
                    location2.getId(),
                    "employee2@test.com",
                    "employee123"
            );

            Employee admin = employeeService.createEmployee(
                    "Vukašin",
                    "Patković",
                    location1.getId(),
                    "admin@test.com",
                    "admin123"
            );
            admin.getUser().setRole(Role.ADMIN);
            userRepository.save(admin.getUser());

            Member member1 = memberService.createMember(
                    "Marija",
                    "Marinković",
                    location1.getId(),
                    "member1@test.com",
                    "member123"
            );

            Member member2 = memberService.createMember(
                    "Jelena",
                    "Jovanović",
                    location2.getId(),
                    "member2@test.com",
                    "member123"
            );

            TrainingType type1 = new TrainingType();
            type1.setName("Personalni trening");
            type1.setPrice(BigDecimal.valueOf(20));

            TrainingType type2 = new TrainingType();
            type2.setName("Grupni trening");
            type2.setPrice(BigDecimal.valueOf(10));

            trainingTypeRepository.saveAll(List.of(type1, type2));

            TrainingSession session1 = new TrainingSession();
            session1.setStartTime(LocalDateTime.now().plusDays(1));
            session1.setEndTime(LocalDateTime.now().plusDays(1).plusHours(1));
            session1.setMaxCapacity(5);
            session1.setLocation(location1);
            session1.setEmployee(employee1);
            session1.setTrainingType(type1);

            TrainingSession session2 = new TrainingSession();
            session2.setStartTime(LocalDateTime.now().plusDays(2));
            session2.setEndTime(LocalDateTime.now().plusDays(2).plusHours(1));
            session2.setMaxCapacity(10);
            session2.setLocation(location2);
            session2.setEmployee(employee2);
            session2.setTrainingType(type2);

            trainingSessionRepository.saveAll(List.of(session1, session2));

            log.info("======================================");
            log.info("SEED PODACI");
            log.info("Admin login:    admin@test.com / admin123");
            log.info("Zaposleni 1:    employee1@test.com / employee123");
            log.info("Zaposleni 2:    employee2@test.com / employee123");
            log.info("Član 1:         member1@test.com / member123");
            log.info("Član 2:         member2@test.com / member123");
            log.info("Tipovi treninga: {}, {}", type1.getId(), type2.getId());
            log.info("Sesije:          {}, {}", session1.getId(), session2.getId());
            log.info("======================================");
        };
    }
}

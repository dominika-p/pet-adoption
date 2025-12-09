package org.example.petadoption.repository;

import org.example.petadoption.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {
    boolean existsByEmail(String email);

    Volunteer findByEmailAndPassword(String email, String password);
}

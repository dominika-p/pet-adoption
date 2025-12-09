package org.example.petadoption.service;

import org.example.petadoption.model.Volunteer;
import org.example.petadoption.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VolunteerService {

    @Autowired
    private VolunteerRepository repository;

    public Volunteer registerVolunteer(Volunteer volunteer) {
        if (repository.existsByEmail(volunteer.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        return repository.save(volunteer);
    }
}

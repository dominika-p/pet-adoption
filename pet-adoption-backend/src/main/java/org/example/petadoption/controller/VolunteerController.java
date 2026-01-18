package org.example.petadoption.controller;

import org.example.petadoption.model.Volunteer;
import org.example.petadoption.repository.VolunteerRepository;
import org.example.petadoption.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/volunteers")
public class VolunteerController {

    private final VolunteerService service;
    private final VolunteerRepository volunteerRepository;

    @Autowired
    public VolunteerController(VolunteerService service, VolunteerRepository volunteerRepository) {
        this.service = service;
        this.volunteerRepository = volunteerRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Volunteer> login(@RequestBody Volunteer loginRequest) {
        Volunteer v = volunteerRepository.findByEmailAndPassword(
                loginRequest.getEmail(), loginRequest.getPassword()
        );
        if (v == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(v);
    }

    @PostMapping("/register")
    public Volunteer register(@RequestBody Volunteer volunteer) {
        return service.registerVolunteer(volunteer);
    }

    // --- PROFIL WOLONTARIUSZA ---
    @GetMapping("/{id}")
    public ResponseEntity<Volunteer> getVolunteerProfile(@PathVariable Long id) {
        return volunteerRepository.findById(id)
                .map(volunteer -> {
                    volunteer.setPassword(null);
                    return ResponseEntity.ok(volunteer);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

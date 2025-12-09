package org.example.petadoption.controller;

import org.example.petadoption.model.Submission;
import org.example.petadoption.repository.SubmissionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*") // pozwala Reactowi łączyć się z backendem
public class SubmissionController {

    private final SubmissionRepository repository;

    public SubmissionController(SubmissionRepository repository) {
        this.repository = repository;
    }

    // --- Dodawanie zgłoszenia ---
    @PostMapping
    public Submission createSubmission(@RequestBody Submission submission) {
        return repository.save(submission);
    }

    // --- Pobranie wszystkich zgłoszeń (np. dla admina) ---
    @GetMapping
    public List<Submission> getAllSubmissions() {
        return repository.findAll();
    }

    // --- Pobranie zgłoszeń według daty (opcjonalnie) ---
    @GetMapping("/by-date")
    public List<Submission> getSubmissionsByDate(@RequestParam String date) {
        return repository.findAll().stream()
                .filter(s -> s.getDate().equals(date))
                .toList();
    }
}

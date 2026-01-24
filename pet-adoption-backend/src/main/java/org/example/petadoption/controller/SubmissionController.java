package org.example.petadoption.controller;

import org.example.petadoption.model.Submission;
import org.example.petadoption.repository.SubmissionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*")
public class SubmissionController {

    private final SubmissionRepository repository;

    public SubmissionController(SubmissionRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Submission createSubmission(@RequestBody Submission submission) {
        return repository.save(submission);
    }

    @GetMapping
    public List<Submission> getAllSubmissions() {
        return repository.findAll();
    }

    @GetMapping("/by-date")
    public List<Submission> getSubmissionsByDate(@RequestParam String date) {
        return repository.findAll().stream()
                .filter(s -> s.getDate().equals(date))
                .toList();
    }
}

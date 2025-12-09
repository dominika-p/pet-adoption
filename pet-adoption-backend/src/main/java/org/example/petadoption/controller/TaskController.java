package org.example.petadoption.controller;


import org.example.petadoption.model.Task;
import org.example.petadoption.model.TaskRequest;
import org.example.petadoption.model.TaskStatus;
import org.example.petadoption.model.Volunteer;
import org.example.petadoption.repository.TaskRepository;
import org.example.petadoption.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private VolunteerRepository volunteerRepository;

    @GetMapping("/by-volunteer/{volunteerId}")
    public ResponseEntity<List<Task>> getTasksByVolunteer(
            @PathVariable Long volunteerId
    ) {
        Volunteer volunteer = volunteerRepository.findById(volunteerId)
                .orElseThrow(() -> new IllegalArgumentException("Volunteer not found"));

        List<TaskStatus> statuses = List.of(TaskStatus.PENDING, TaskStatus.APPROVED, TaskStatus.CANCELLED);
        List<Task> tasks = taskRepository.findByVolunteerAndStatusIn(volunteer, statuses);

        return ResponseEntity.ok(tasks);
    }
    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody TaskRequest request) {
        if (request.getVolunteerId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Volunteer volunteer = volunteerRepository.findById(request.getVolunteerId())
                .orElseThrow(() -> new IllegalArgumentException("Volunteer not found"));

        Task task = new Task();
        task.setVolunteer(volunteer);
        task.setType(request.getType());
        task.setDate(request.getDate());
        task.setTime(request.getTime());
        task.setNote(request.getNote());
        task.setStatus(request.getStatus());

        Task saved = taskRepository.save(task);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/cancel/{taskId}")
    public ResponseEntity<Task> cancelTask(
            @PathVariable Long taskId,
            @RequestBody CancelRequest cancelRequest
    ) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        task.setStatus(TaskStatus.CANCELLED);
        task.setCancellationReason(cancelRequest.getReason());

        Task updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }
    public static class CancelRequest {
        private String reason;
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }
}

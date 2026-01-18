package org.example.petadoption.controller;

import org.example.petadoption.model.*;
import org.example.petadoption.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final String ADMIN_USERNAME = "admin";
    private final String ADMIN_PASSWORD = "haslo123";

    private final TaskRepository taskRepository;

    public AdminController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (ADMIN_USERNAME.equals(request.getUsername()) &&
                ADMIN_PASSWORD.equals(request.getPassword())) {

            UserResponse user = new UserResponse(ADMIN_USERNAME, "ADMIN");
            return ResponseEntity.ok(user);
        }

        return ResponseEntity
                .status(401)
                .body("{\"message\":\"Niepoprawny login lub hasło\"}");
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getPendingTasks() {
        List<Task> pendingTasks = taskRepository.findByStatus(TaskStatus.PENDING);
        return ResponseEntity.ok(pendingTasks);
    }

    @PostMapping("/tasks/{id}/approve")
    public ResponseEntity<Task> approveTask(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(TaskStatus.APPROVED);
        Task updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping("/tasks/approved")
    public ResponseEntity<List<Map<String,Object>>> getApprovedTasks() {
        List<Task> tasks = taskRepository.findByStatus(TaskStatus.APPROVED);

        List<Map<String,Object>> dto = tasks.stream().map(t -> {
            Map<String,Object> map = new HashMap<>();
            map.put("id", t.getId());
            map.put("type", t.getType());
            map.put("date", t.getDate().toString());
            map.put("time", t.getTime().toString());
            map.put("volunteerName", t.getVolunteerName());
            map.put("volunteerPhone", t.getVolunteer() != null ? t.getVolunteer().getPhone() : "");
            map.put("status", t.getStatus().name());
            return map;
        }).toList();

        return ResponseEntity.ok(dto);
    }


    @PostMapping("/tasks/{id}/reject")
    public ResponseEntity<Task> rejectTask(@PathVariable Long id, @RequestBody(required = false) String reason) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(TaskStatus.CANCELLED);
        task.setCancellationReason(reason);
        Task updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }
}

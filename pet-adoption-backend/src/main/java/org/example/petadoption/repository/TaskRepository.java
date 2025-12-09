package org.example.petadoption.repository;

import org.example.petadoption.model.Task;
import org.example.petadoption.model.TaskStatus;
import org.example.petadoption.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByVolunteerId(Long volunteerId);

    List<Task> findByDate(LocalDate date);

    List<Task> findByVolunteerIdAndDate(Long volunteerId, LocalDate date);

    List<Task> findByVolunteerAndDate(Volunteer volunteer, LocalDate localDate);

    List<Task> findByStatus(TaskStatus pending);
    List<Task> findByVolunteerAndDateAndStatusIn(Volunteer volunteer, LocalDate date, List<TaskStatus> statuses);

    List<Task> findByVolunteerAndStatusIn(Volunteer volunteer, List<TaskStatus> statuses);
}

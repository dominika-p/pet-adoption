package org.example.petadoption.model;


import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TaskRequest {
    private Long volunteerId;
    private String type;
    private LocalDate date;
    private LocalTime time;
    private String note;
    private TaskStatus status;
}

package org.example.petadoption.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskDTO {
    private Long id;
    private String type;
    private String date;
    private String time;
    private String volunteerName;
    private String volunteerPhone;
    private String status;
}

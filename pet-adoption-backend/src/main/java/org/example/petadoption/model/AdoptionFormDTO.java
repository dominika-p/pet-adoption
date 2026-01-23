package org.example.petadoption.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdoptionFormDTO {
    private String name;
    private String email;
    private String phone;
    private String date;
    private String time;
    private String visitType;
    private String message;
    private boolean consent;

    private String animalName;
}

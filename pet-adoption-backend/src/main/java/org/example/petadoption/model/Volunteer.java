package org.example.petadoption.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@Data
@Entity
@Table(name = "volunteers")
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String birthDate;
    private String phone;
    private String email;
    private String password;
    @OneToMany(mappedBy = "volunteer", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Task> tasks;

}

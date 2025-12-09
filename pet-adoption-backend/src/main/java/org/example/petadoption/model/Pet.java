package org.example.petadoption.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pets")
@Getter
@Setter
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String species;

    private String gender;

    private String age;

    private Integer ageYears;

    private Integer ageMonths;

    private String size;

    private String img;

    private String shelterTime;

    @Column(columnDefinition = "TEXT")
    private String history;

    private String goodWithAnimals;

    private String goodWithKids;
}

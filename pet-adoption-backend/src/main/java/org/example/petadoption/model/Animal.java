package org.example.petadoption.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String species;
    private String gender;
    private Integer ageYears;
    private Integer ageMonths;
    private String ageCategory;
    private String size;
    private String breed;

    @Column(length = 1000)
    private String history;

    private String goodWithAnimals;
    private String goodWithKids;

    private String img;
    private String imgContentType;
}

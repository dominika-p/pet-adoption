package org.example.petadoption.service;


import org.example.petadoption.model.Animal;
import org.example.petadoption.repository.AnimalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnimalService {

    private final AnimalRepository repository;

    public AnimalService(AnimalRepository repository) {
        this.repository = repository;
    }

    public Animal addAnimal(Animal animal) {
        int totalMonths = (animal.getAgeYears() != null ? animal.getAgeYears() : 0) * 12 +
                (animal.getAgeMonths() != null ? animal.getAgeMonths() : 0);

        if (totalMonths >= 84) animal.setAgeCategory("Senior");
        else if (totalMonths >= 12) animal.setAgeCategory("Dorosły");
        else animal.setAgeCategory("Młody");

        return repository.save(animal);
    }

    public List<Animal> getAllAnimals() {
        return repository.findAll();
    }

    public void deleteAnimal(Long id) {
        repository.deleteById(id);
    }
}
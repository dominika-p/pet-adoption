package org.example.petadoption.controller;

import org.example.petadoption.model.Animal;
import org.example.petadoption.repository.AnimalRepository;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = "http://localhost:3000")
public class AnimalController {

    private final AnimalRepository repository;

    public AnimalController(AnimalRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Animal> getAnimals() {
        return repository.findAll();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Animal> addAnimal(
            @ModelAttribute Animal animal,
            @RequestPart("file") MultipartFile file
    ) throws IOException {

        System.out.println("POST /api/animals HIT");

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String filename = System.currentTimeMillis() + "_" +
                StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        Path uploadDir = Paths.get("uploads/images");
        Files.createDirectories(uploadDir);

        Path filePath = uploadDir.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        int totalMonths = animal.getAgeYears() * 12 + animal.getAgeMonths();
        animal.setAgeCategory(
                totalMonths >= 84 ? "Senior" :
                        totalMonths >= 12 ? "Dorosły" : "Młody"
        );

        animal.setImg("http://localhost:5000/images/" + filename);
        animal.setImgContentType(file.getContentType());

        Animal saved = repository.save(animal);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Animal> updateAnimal(@PathVariable Long id, @RequestBody Animal updated) {
        return repository.findById(id).map(animal -> {
            animal.setName(updated.getName());
            animal.setSpecies(updated.getSpecies());
            animal.setGender(updated.getGender());
            animal.setAgeYears(updated.getAgeYears());
            animal.setAgeMonths(updated.getAgeMonths());
            animal.setBreed(updated.getBreed());
            animal.setSize(updated.getSize());
            animal.setGoodWithAnimals(updated.getGoodWithAnimals());
            animal.setGoodWithKids(updated.getGoodWithKids());
            animal.setHistory(updated.getHistory());

            int totalMonths = (updated.getAgeYears() * 12) + updated.getAgeMonths();
            animal.setAgeCategory(
                    totalMonths >= 84 ? "Senior" :
                            totalMonths >= 12 ? "Dorosły" : "Młody"
            );

            Animal saved = repository.save(animal);
            return ResponseEntity.ok(saved);
        }).orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

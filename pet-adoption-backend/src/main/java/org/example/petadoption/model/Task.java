package org.example.petadoption.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "volunteer_tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Powiązanie zadania z wolontariuszem
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_id", nullable = false)
    @JsonBackReference
    private Volunteer volunteer;

    // Typ aktywności: Spacer, Sprzątanie...
    @Column(nullable = false)
    private String type;

    // Data zadania
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate date;

    // Godzina np. 10:00, 11:00
    @JsonFormat(pattern = "HH:mm")
    @Column(nullable = false)
    private LocalTime time;

    // Dodatkowa notatka
    @Column(columnDefinition = "TEXT")
    private String note;

    // pending / approved / cancelled
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status;

    // powód anulowania
    private String cancellationReason;

    public String getVolunteerName() {
        if (volunteer == null) return "";
        return volunteer.getName();
    }
}

package org.example.petadoption.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "contact_messages")
@Getter
@Setter
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String issue;
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(columnDefinition = "TEXT")
    private String reply;

    public ContactMessage() {}

    public ContactMessage(String email, String issue, String subject, String message) {
        this.email = email;
        this.issue = issue;
        this.subject = subject;
        this.message = message;
    }

}
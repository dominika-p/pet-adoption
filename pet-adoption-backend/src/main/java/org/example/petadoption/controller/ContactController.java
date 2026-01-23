package org.example.petadoption.controller;

import org.example.petadoption.model.ContactMessage;
import org.example.petadoption.repository.ContactMessageRepository;
import org.example.petadoption.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    private final ContactMessageRepository repository;
    private final EmailService emailService;

    public ContactController(ContactMessageRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendAdoptionInquiry(@RequestBody Map<String, Object> data) {
        try {
            String myEmail = "kontaktadoptujprzyjaciela@gmail.com";

            String animalName = (String) data.get("animalName");
            String subject = "Nowe zgłoszenie adopcyjne: " + animalName;

            String content = String.format(
                    "Otrzymano nowy formularz wizyty / adopcji:\n\n" +
                            "Zwierzak: %s\n" +
                            "Imię i nazwisko: %s\n" +
                            "Email kontaktowy: %s\n" +
                            "Telefon: %s\n" +
                            "Data wizyty: %s\n" +
                            "Godzina: %s\n" +
                            "Typ wizyty: %s\n" +
                            "Wiadomość dodatkowa: %s\n",
                    animalName,
                    data.get("name"),
                    data.get("email"),
                    data.get("phone"),
                    data.get("date"),
                    data.get("time"),
                    data.get("visitType"),
                    data.get("message")
            );

            emailService.sendEmail(myEmail, subject, content);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Błąd podczas wysyłania: " + e.getMessage());
        }
    }

    @PostMapping("/time-with-animals")
    public ResponseEntity<?> sendTimeInquiry(@RequestBody Map<String, Object> data) {
        try {
            String myEmail = "kontaktadoptujprzyjaciela@gmail.com";
            String subject = "Zgłoszenie: Spędź czas ze zwierzakiem";

            String content = String.format(
                    "Nowe zgłoszenie chęci pomocy:\n\n" +
                            "Imię i nazwisko: %s\n" +
                            "Email: %s\n" +
                            "Telefon: %s\n" +
                            "Aktywność: %s\n" +
                            "Data wizyty: %s\n" +
                            "Godzina: %s\n" +
                            "Wiadomość/Uwagi: %s\n",
                    data.get("name"),
                    data.get("email"),
                    data.get("phone"),
                    data.get("activity"),
                    data.get("date"),
                    data.get("hour"),
                    data.get("message")
            );

            emailService.sendEmail(myEmail, subject, content);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Błąd: " + e.getMessage());
        }
    }

    @PostMapping
    public ContactMessage submitContact(@RequestBody ContactMessage message) {
        return repository.save(message);
    }

    @GetMapping("/all")
    public List<ContactMessage> getAllMessages() {
        return repository.findAll();
    }


    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id) {
        repository.deleteById(id);
    }


    @PatchMapping("/{id}/reply")
    public ContactMessage replyMessage(@PathVariable Long id, @RequestBody Map<String, String> body) {
        ContactMessage msg = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Wiadomość nie istnieje"));

        String replyText = body.get("reply");
        msg.setReply(replyText);
        repository.save(msg);

        if (msg.getEmail() != null && !msg.getEmail().isEmpty()) {
            String subject = "Odpowiedź na Twoją wiadomość: " + msg.getSubject();
            String text = "Witaj,\n\nOdpowiedź na Twoją wiadomość:\n\n" + replyText +
                    "\n\nPozdrawiamy, Schronisko Adoptuj Przyjaciela 🐾";

            emailService.sendEmail(msg.getEmail(), subject, text);
            System.out.println("Mail wysłany na: " + msg.getEmail());
        } else {
            System.out.println("Brak emaila do wysłania odpowiedzi.");
        }

        return msg;
    }

    @PostMapping("/send-message")
    public ResponseEntity<?> sendContactMessage(@RequestBody Map<String, Object> data) {
        try {
            String myEmail = "kontaktadoptujprzyjaciela@gmail.com";

            String subject = (String) data.get("subject");
            String content = String.format(
                    "Otrzymano nową wiadomość kontaktową:\n\n" +
                            "Email nadawcy: %s\n" +
                            "Sprawa: %s\n" +
                            "Temat: %s\n" +
                            "Treść: %s\n",
                    data.get("email"),
                    data.get("issue"),
                    data.get("subject"),
                    data.get("message")
            );

            emailService.sendEmail(myEmail, subject, content);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Błąd podczas wysyłania: " + e.getMessage());
        }
    }

}

import React, { useState, useEffect } from "react";
import "../components/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    issue: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Scroll do góry przy wejściu na podstronę
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Wysłano wiadomość:", formData);
    setSubmitted(true);
    setFormData({ issue: "", subject: "", message: "" });
  };

  return (
    <section
      className="contact-container"
      style={{
        backgroundImage: "url(/img/contact.jpg)", // tło z public
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Przyciemnienie */}
      <div className="contact-bg"></div>

      <div className="contact-header">
        <h1>Kontakt</h1>
        <p>Skontaktuj się z nami — chętnie pomożemy!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Schronisko „Adoptuj przyjaciela”</h2>
          <p><strong>Adres:</strong> ul. Leśna 12, 00-000 Warszawa</p>
          <p><strong>Telefon:</strong> +48 123 456 789</p>
          <p><strong>Email:</strong> kontakt@adoptujprzyjaciela.pl</p>
          <p><strong>Godziny otwarcia:</strong><br />
            Poniedziałek: 9:00 – 17:00<br />
            Wtorek: 9:00 – 17:00<br />
            Środa: 9:00 – 17:00<br />
            Czwartek: 8:00 – 18:00<br />
            Piątek: 8:00 – 18:00<br />
            Sobota: 9:00 – 15:00<br />
            Niedziela: 10:00 - 14:00
            </p>
        </div>

        <div className="contact-form">
          <h2>Formularz kontaktowy</h2>

          {submitted ? (
            <div className="form-success">
              <p>Dziękujemy! Twoja wiadomość została wysłana 🐾</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="issue">Wybierz sprawę:</label>
              <select
                name="issue"
                id="issue"
                value={formData.issue}
                onChange={handleChange}
                required
              >
                <option value="">-- wybierz --</option>
                <option value="adopcja">Adopcja zwierzaka</option>
                <option value="wolontariat">Wolontariat</option>
                <option value="darowizna">Darowizna lub wsparcie</option>
                <option value="inne">Inna sprawa</option>
              </select>

              <label htmlFor="subject">Temat:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Wpisz temat wiadomości"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <label htmlFor="message">Treść wiadomości:</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Opisz swoją sprawę..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit">Wyślij wiadomość</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;


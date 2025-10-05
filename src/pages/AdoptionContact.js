import React from "react";
import { useParams } from "react-router-dom";
import "./AdoptionContact.css"; // dodaj import na górze pliku


const AdoptionContact = () => {
  const { animalName } = useParams();

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", textAlign: "center" }}>
      <h2>Formularz kontaktowy w sprawie {animalName}</h2>
      <form>
        <input
          type="text"
          placeholder="Twoje imię i nazwisko"
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <input
          type="email"
          placeholder="Twój email"
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          placeholder="Twoja wiadomość"
          rows="5"
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#e78c58",
            color: "white",
            border: "none",
            borderRadius: "999px",
            cursor: "pointer",
          }}
        >
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default AdoptionContact;

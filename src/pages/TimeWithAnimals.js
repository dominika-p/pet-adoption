import React from "react";
import "./TimeWithAnimals.css";

const TimeWithAnimals = () => {
  return (
    <div className="time-with-animals-page">
      {/* Nagłówek z dużym zdjęciem */}
      <header
        className="activity-header"
        style={{ backgroundImage: "url('/img/time-with-dog.jpg')" }}
      >
        <h1 className="activity-title">Spędź czas ze zwierzakiem</h1>
      </header>

      {/* Główna zawartość */}
      <div className="activity-wrapper activity-wrapper-overlap">
        <p className="activity-intro">
          Nie musisz być wolontariuszem, aby pomóc naszym podopiecznym. Możesz umówić się na spacer, zabawę z kotem, sprzątanie boksów lub po prostu przyjść na chwilę towarzystwa.
        </p>

        <div className="activity-contact">
          <a href="tel:+48123123123" className="activity-phone">
            Zadzwoń: 123-123-123
          </a>

          <form className="activity-form">
            <input type="text" placeholder="Imię i nazwisko" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Telefon (opcjonalnie)" />
            <select required>
              <option value="">Wybierz aktywność</option>
              <option value="spacer">Spacer z psem</option>
              <option value="zabawa">Zabawa z kotem</option>
              <option value="sprzatanie">Sprzątanie boksów</option>
              <option value="inne">Inne</option>
            </select>
            <textarea placeholder="Uwagi / wiadomość"></textarea>
            <button type="submit">Wyślij</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TimeWithAnimals;



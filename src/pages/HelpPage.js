import React from "react";
import "./HelpPage.css";

const HelpPage = () => {
  return (
    <div className="help-container">
      <header
        className="help-header"
        style={{
          backgroundImage: "url('/img/help-page.jpg')", 
        }}
      >
        <h1 className="help-title">Jak możesz pomóc?</h1>
      </header>

      <div className="help-wrapper">
        <article className="help-content">
          <p>
            Nasze schronisko utrzymuje się dzięki wsparciu ludzi o dobrych
            sercach. Każda forma pomocy, finansowa czy rzeczowa ma ogromne
            znaczenie dla naszych podopiecznych.
          </p>

          <h4>Wesprzyj nas finansowo</h4>
          <p>
            Możesz przekazać darowiznę na konto schroniska lub szybkim
            przelewem BLIK. Każda złotówka trafia na jedzenie, leki i opiekę
            weterynaryjną.
          </p>

          <blockquote>
            <strong>Dane do przelewu:</strong><br />
            Schronisko dla Zwierząt „Przyjaciele” <br />
            Nr konta: <em>12 3456 7890 1234 5678 9000 0000</em> <br />
            Tytuł przelewu: Darowizna na schronisko
          </blockquote>

          <blockquote>
            <strong>Szybki BLIK:</strong><br />
            Wpisz numer telefonu: <em>600 123 456</em>
          </blockquote>

          <h4>Pomoc rzeczowa – karma i akcesoria</h4>
          <p>
            Jeśli wolisz pomóc w formie darów, chętnie przyjmiemy karmę i inne
            rzeczy potrzebne naszym zwierzakom:
          </p>

          <ul>
            <li>
              Karma sucha i mokra dla psów i kotów (Royal Canin, Brit, Dolina Noteci)
            </li>
            <li>Żwirek dla kotów (bentonitowy, drewniany)</li>
            <li>Koce, ręczniki, posłania</li>
            <li>Obroże, smycze, szelki</li>
            <li>Środki czystości (płyny do mycia, rękawiczki jednorazowe)</li>
          </ul>

          <blockquote>
            <strong>Adres schroniska:</strong><br />
            Schronisko „Przyjaciele” <br />
            ul. Zwierzyniecka 12, 00-000 Warszawa <br />
            Godziny przyjmowania darów: pon–sob 10:00–17:00
          </blockquote>

          <h4>Dziękujemy!</h4>
          <p>
            Dziękujemy za każdą pomoc — dzięki Tobie możemy zapewnić naszym
            zwierzakom lepsze życie 🐾
          </p>

          <button
            className="back-to-home"
            onClick={() => (window.location.href = "/")}
          >
            ← Powrót na stronę główną
          </button>
        </article>
      </div>
    </div>
  );
};

export default HelpPage;


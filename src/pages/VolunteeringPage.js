import React from "react";
import "./VolunteeringPage.css";

const VolunteeringPage = () => {
  return (
    <div className="volunteering-page">
      {/* Nagłówek */}
      <header
        className="volunteer-header"
        style={{ backgroundImage: "url('/img/wolontariat.jpg')" }}
      >
        <h1 className="volunteer-title">Wolontariat w schronisku</h1>
      </header>

      {/* Główna zawartość */}
      <div className="volunteer-wrapper volunteer-wrapper-overlap">
        <p className="volunteer-intro">
          Zostań wolontariuszem naszego schroniska! Możesz pomagać w opiece nad psami i kotami, uczestniczyć w spacerach i zabawach, a także zbierać punkty, które możesz wymienić na nagrody.
        </p>

        <div className="volunteer-info">
          <h3>Jak możesz pomóc?</h3>
          <ul>
            <li>Spacer z psem</li>
            <li>Zabawa z kotem</li>
            <li>Sprzątanie boksów</li>
            <li>Pomoc w karmieniu i opiece</li>
          </ul>

          <h3>Punkty i nagrody</h3>
          <ul>
            <li>Kubek – 50 punktów</li>
            <li>Plecak – 100 punktów</li>
            <li>Skarpetki – 30 punktów</li>
            <li>Czekolada / batonik – 20 punktów</li>
            <li>Karma dla zwierzaka – 80 punktów</li>
          </ul>

          <p>
            Aby dołączyć do wolontariatu, <a href="/volunteer-login">zaloguj się lub zarejestruj konto</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VolunteeringPage;


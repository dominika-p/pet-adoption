import React from "react";
import "../components/AboutUs.css";

const AboutUs = () => {
  return (
    <section className="about-container">
      <div className="about-header">
        <h1>O nas</h1>
        <p>Kim jesteśmy i dlaczego pomagamy zwierzętom</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Krótka historia o naszym schronisku</h2>
          <p>
            Schronisko „Przyjazna Łapa” zostało założone w <strong>2021 roku</strong> z pasji i miłości do zwierząt. Naszym głównym celem jest 
            <strong> ratowanie, leczenie i znajdowanie nowych domów</strong> dla bezdomnych psów i kotów.  
            Każdego roku pomagamy setkom zwierząt, które trafiają do nas z różnych
            części kraju: porzucone, chore, często po traumatycznych przeżyciach.
            Dzięki pracy naszych wolontariuszy, weterynarzy i darczyńców,
            możemy zapewnić im bezpieczeństwo i miłość, na jaką zasługują.
          </p>

          <h3>Naszą misja jest:</h3>
          <ul>
            <li>zapewnienie bezpiecznego schronienia dla bezdomnych zwierząt</li>
            <li>promowanie adopcji zamiast kupna</li>
            <li>edukacja społeczeństwa w zakresie odpowiedzialnej opieki</li>
            <li>walka z bezdomnością zwierząt poprzez sterylizacje i kastracje</li>
          </ul>

          <p className="quote">
            „Nie możemy zmienić całego świata, ale możemy zmienić cały świat dla jednego zwierzęcia.”
          </p>

          <p>
            Zapraszamy do odwiedzin naszego schroniska, adopcji naszych podopiecznych 
            lub wsparcia w formie wolontariatu czy darowizn.
          </p>
        </div>

        <div className="about-image">
          <img
            src="/img/about-us.jpg"
            alt="Schronisko Przyjazna Łapa"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;



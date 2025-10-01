import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import AnimalCard from "../components/AnimalCard";
import "./Home.css";

const Home = () => {
  const [selectedSpecies, setSelectedSpecies] = useState("Pies");
  const [visibleAnimals, setVisibleAnimals] = useState([]);

  const animals = [
    { name: "Junior", gender: "On", age: "Młody", size: "Średni", img: "/img/junior.jpg" },
    { name: "Tosia", gender: "Ona", age: "Senior", size: "Duża", img: "/img/tosia.jpg" },
    { name: "Heniek", gender: "On", age: "Dorosły", size: "Średni", img: "/img/heniek.jpg" },
    { name: "Maja i Kaja", gender: "One", age: "Młode", size: "Małe", img: "/img/majaikaja.jpg" },
    { name: "Klemens", gender: "On", age: "Senior", size: "-", img: "/img/klemens.jpg" },
    { name: "Pantera", gender: "Ona", age: "Młoda", size: "-", img: "/img/pantera.jpg" },
    { name: "Jamal", gender: "On", age: "Dorosły", size: "-", img: "/img/jamal.jpg" },
    { name: "Bunia", gender: "Ona", age: "Junior", size: "-", img: "/img/bunia.jpg" },
  ];

  // Ustawienie widocznych kart w zależności od szerokości ekranu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 570) {
        setVisibleAnimals(animals.slice(0, 4)); // tylko 4 karty
      } else {
        setVisibleAnimals(animals); // wszystkie karty
      }
    };

    handleResize(); // ustawienie przy pierwszym renderze
    window.addEventListener("resize", handleResize); // aktualizacja przy zmianie rozmiaru

    return () => window.removeEventListener("resize", handleResize);
  }, [animals]);

  // JSX filtrów przekazywany do HeroSection (nie zmieniany)
  const filtersJSX = (
    <div className="filters">
      <div className="filters-row">
        <button
          type="button"
          className={selectedSpecies === "Pies" ? "active" : ""}
          onClick={() => setSelectedSpecies("Pies")}
        >
          Pies
        </button>
        <button
          type="button"
          className={selectedSpecies === "Kot" ? "active" : ""}
          onClick={() => setSelectedSpecies("Kot")}
        >
          Kot
        </button>
      </div>

      <div className="filters-row">
        <select disabled={selectedSpecies === "Kot"}>
          <option value="">Wielkość</option>
          <option value="Mały">Mały</option>
          <option value="Średni">Średni</option>
          <option value="Duży">Duży</option>
        </select>

        <select>
          <option value="">Wiek</option>
          <option value="Młody">Młody</option>
          <option value="Dorosły">Dorosły</option>
          <option value="Senior">Senior</option>
        </select>

        <select>
          <option value="">Płeć</option>
          <option value="On">On</option>
          <option value="Ona">Ona</option>
        </select>
      </div>

      <div className="filters-row">
        <button type="submit" className="search-button">Szukaj</button>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <HeroSection
        img="/img/dog-cat-hero.jpg"
        title="Adoptuj zwierzaka"
        subtitle="Nasze pupile czekają na Ciebie"
        filters={filtersJSX}
      />

      <section className="about-section">
        <div className="about-content">
          <img src="/img/kot-i-pies.png" alt="Kot i pies" className="about-img"/>
          <div className="about-text">
            <h3>O NAS</h3>
            <p>
              Naszą misją jest znajdowanie nowych domów dla zwierząt potrzebujących
              opieki. Wspieramy adopcję psów i kotów, a także edukujemy, jak najlepiej
              dbać o swoich czworonożnych przyjaciół.
            </p>
          </div>      
        </div>
      </section>

      <section className="adoption-section">
        <h3>Pupile do adopcji</h3>
        <div className="animal-list">
          {visibleAnimals.map((a, i) => (
            <AnimalCard
              key={i}
              name={a.name}
              gender={a.gender}
              age={a.age}
              size={a.size}
              img={a.img}
            />
          ))}
        </div>
        <button className="more-button">ZOBACZ WIĘCEJ ZWIERZAKÓW</button>
      </section>
    </div>
  );
};

export default Home;







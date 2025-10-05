import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import BlogSection from "../components/BlogSection";
import AnimalList from "../components/AnimalList";
import Footer from "../components/Footer"; // <-- dodany import stopki
import posts from "../data/postsData";
import animalsData from "../data/animalsData";
import "./Home.css";

const Home = () => {
  const [selectedSpecies, setSelectedSpecies] = useState("Pies");

  const filtersJSX = (
    <div className="filters">
      {/* Grupa 1: Typ zwierzaka */}
      <div className="filters-row type-row">
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

      {/* Grupa 2: Wielkość / Wiek / Płeć */}
      <div className="filters-row traits-row">
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

      {/* Grupa 3: Szukaj */}
      <div className="filters-row search-row">
        <button type="submit" className="search-button">
          Szukaj
        </button>
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
          <img src="/img/kot-i-pies.png" alt="Kot i pies" className="about-img" />
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
        <AnimalList animals={animalsData} />
      </section>

      <BlogSection posts={posts} />

      {/* Stopka */}
      <Footer />
    </div>
  );
};

export default Home;









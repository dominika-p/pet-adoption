import React, { useState, useEffect } from "react"; // Dodano useState i useEffect
import HeroSection from "../components/HeroSection";
import BlogSection from "../components/BlogSection";
import AnimalList from "../components/AnimalList";
import Footer from "../components/Footer";
import posts from "../data/postsData";
import "./Home.css";

const Home = () => {
  const [latestAnimals, setLatestAnimals] = useState([]); // Stan na zwierzaki z bazy
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestAnimals = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/animals");
        if (response.ok) {
          const data = await response.json();
          // Pobieramy 4 ostatnio dodane zwierzaki (zakładając, że ID rośnie lub sortujemy datą)
          // .slice(-4) bierze 4 ostatnie elementy, .reverse() daje najnowsze na początku
          const lastFour = data.slice(-4).reverse();
          setLatestAnimals(lastFour);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania najnowszych zwierzaków:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAnimals();
  }, []);

  return (
    <>
      {/* Hero z pełnym tłem */}
      <HeroSection img="/img/dog-cat-hero.png" />

      {/* Sekcja O NAS */}
      <section className="about-section">
        <div className="page-wrapper">
          <div className="about-content">
            <img
              src="/img/kot-i-pies.png"
              alt="Kot i pies"
              className="about-img"
            />
            <div className="about-text">
              <h3>O NAS</h3>
              <p>
                Naszą misją jest łączenie ludzi o wielkich sercach ze zwierzętami,
                które potrzebują nowego domu. Każdy pies i kot w naszym schronisku
                ma swoją historię – czasem trudną, ale z nadzieją na szczęśliwe
                zakończenie.
              </p>
              <p>
                Wspieramy adopcję poprzez odpowiedzialne podejście – pomagamy
                przyszłym opiekunom przygotować się na nowego przyjaciela,
                doradzamy w kwestiach opieki i wychowania oraz dzielimy się
                doświadczeniem, jak zapewnić pupilowi szczęśliwe życie.
              </p>
              <p>
                Nasz zespół wolontariuszy codziennie udowadnia, że
                miłość do zwierząt potrafi zmieniać świat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja adopcji */}
      <section className="adoption-section">
        <div className="page-wrapper">
          <h3>Ostatnio dodane zwierzaki do adopcji</h3>
          {loading ? (
            <p style={{ textAlign: 'center' }}>Ładowanie zwierzaków...</p>
          ) : latestAnimals.length > 0 ? (
            <AnimalList animals={latestAnimals} />
          ) : (
            <p style={{ textAlign: 'center' }}>Brak zwierzaków do wyświetlenia.</p>
          )}
        </div>
      </section>

      {/* Sekcja blogowa */}
      <section className="blog-section">
        <div className="page-wrapper">
          <BlogSection posts={posts} />
        </div>
      </section>

      {/* Stopka */}
      <Footer />
    </>
  );
};

export default Home;
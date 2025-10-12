import React from "react";
import HeroSection from "../components/HeroSection";
import BlogSection from "../components/BlogSection";
import AnimalList from "../components/AnimalList";
import Footer from "../components/Footer";
import posts from "../data/postsData";
import animalsData from "../data/animalsData";
import "./Home.css";

const Home = () => {
  const latestAnimals = animalsData.slice(-4).reverse();

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
          <AnimalList animals={latestAnimals} />
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











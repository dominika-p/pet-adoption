import React from "react";
import "./HeroSection.css";

const HeroSection = ({ img, title, subtitle, filters }) => {
  return (
    <section className="hero-section">
      <div className="hero-text">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        {filters} {/* JSX filtrów przekazany z Home.js */}
      </div>
      <img src={img} alt="hero" className="hero-img" />
    </section>
  );
};

export default HeroSection;



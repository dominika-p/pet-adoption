import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
      <img src="/img/logo.png" alt="Adoptuj Przyjaciela" />
    </a>

        {/* Hamburger tylko dla mobilnych */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <nav className={`nav ${isOpen ? "open" : ""}`}>
          <a href="#">Aktualności</a>
          <a href="#">Zwierzak do adopcji</a>
          <a href="#">Czas ze zwierzakiem</a>
          <a href="#">O nas</a>
          <a href="#">Jak pomóc?</a>
          <a href="#">Blog</a>
          <a href="#">Kontakt</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;



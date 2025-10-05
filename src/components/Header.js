import React, { useState, useEffect, useRef } from "react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Zamknięcie menu po kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
          <img src="/img/logo.png" alt="Adoptuj Przyjaciela" />
        </a>

        <div
          ref={hamburgerRef}
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        <nav ref={navRef} className={`nav ${isOpen ? "open" : ""}`}>
          <a href="/zwierzak-do-adopcji">Zwierzak do adopcji</a>
          <a href="/czas-ze-zwierzakiem">Czas ze zwierzakiem</a>
          <a href="/o-nas">O nas</a>
          <a href="/jak-pomoc">Jak pomóc?</a>
          <a href="/blog">Blog</a>
          <a href="/kontakt">Kontakt</a>
        </nav>

        {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}
      </div>
    </header>
  );
};

export default Header;







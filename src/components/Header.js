import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // 👈 dodaj import
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
        <Link to="/" className="logo">
          <img src="/img/logo.png" alt="Adoptuj Przyjaciela" />
        </Link>

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
          <Link to="/zwierzaki-do-adopcji">Zwierzaki do adopcji</Link>
          <Link to="/czas-ze-zwierzakiem">Czas ze zwierzakiem</Link>
          <Link to="/help">Jak pomóc?</Link> 
          <Link to="/wolontariat">Wolontariat</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/o-nas">O nas</Link>
          <Link to="/kontakt">Kontakt</Link>
        </nav>

        {isOpen && (
          <div className="nav-overlay" onClick={() => setIsOpen(false)} />
        )}
      </div>
    </header>
  );
};

export default Header;








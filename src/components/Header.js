import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // ➤ Wczytujemy użytkownika z localStorage przy starcie
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ➤ Kliknięcie poza menu zamyka je
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

  // ➤ Wylogowanie
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    navigate("/"); // przekierowanie na stronę główną
  };

  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          <img src="/img/logo.png" alt="Adoptuj Przyjaciela" />
        </Link>

        {/* HAMBURGER */}
        <div
          ref={hamburgerRef}
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* MENU */}
        <nav ref={navRef} className={`nav ${isOpen ? "open" : ""}`}>
          <Link to="/zwierzaki-do-adopcji">Zwierzaki do adopcji</Link>
          <Link to="/czas-ze-zwierzakiem">Czas ze zwierzakiem</Link>
          <Link to="/help">Jak pomóc?</Link>
          <Link to="/wolontariat">Wolontariat</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/o-nas">O nas</Link>
          <Link to="/kontakt">Kontakt</Link>

          {/* MOBILE — konto */}
          <div className="account-mobile">
            {!user ? (
              <Link to="/volunteer-login">Konto</Link>
            ) : (
              <>
                <Link to="/moje-konto">Moje konto</Link>
                <button className="logout-btn" onClick={handleLogout}>
                  Wyloguj
                </button>
              </>
            )}
          </div>
        </nav>

        {/* DESKTOP — konto */}
        <div className="account-desktop">
          {!user ? (
            <Link to="/volunteer-login" className="account-link">Konto</Link>
          ) : (
            <>
              <Link to="/moje-konto" className="account-link">Moje konto</Link>
              <button onClick={handleLogout} className="logout-btn">Wyloguj</button>
            </>
          )}
        </div>

        {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}
      </div>
    </header>
  );
};

export default Header;










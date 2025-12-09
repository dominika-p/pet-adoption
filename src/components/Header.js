import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { user: adminUser, logout: adminLogout } = useContext(AuthContext);
  const { user: volunteerUser, setUser: setVolunteerUser } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // kliknięcie poza menu zamyka je
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

  const handleVolunteerLogout = () => {
    localStorage.removeItem("volunteer");
    setVolunteerUser(null);
    navigate("/volunteer-login");
  };

  const handleAdminLogout = () => {
    adminLogout();
    navigate("/admin");
  };

  // wybór bieżącego użytkownika
  const currentUser = adminUser || volunteerUser;
  const isAdmin = !!adminUser;

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/img/logo.png" alt="Adoptuj Przyjaciela" />
        </Link>

        <div
          ref={hamburgerRef}
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div></div><div></div><div></div>
        </div>

        <nav ref={navRef} className={`nav ${isOpen ? "open" : ""}`}>
          <Link to="/zwierzaki-do-adopcji">Zwierzaki do adopcji</Link>
          <Link to="/czas-ze-zwierzakiem">Czas ze zwierzakiem</Link>
          <Link to="/help">Jak pomóc?</Link>
          <Link to="/wolontariat">Wolontariat</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/o-nas">O nas</Link>
          <Link to="/kontakt">Kontakt</Link>

          <div className="account-mobile">
            {!currentUser ? (
              <Link to="/volunteer-login">Konto</Link>
            ) : isAdmin ? (
              <>
                <Link to="/admin">Panel admina</Link>
                <button className="logout-btn" onClick={handleAdminLogout}>Wyloguj</button>
              </>
            ) : (
              <>
                <Link to="/volunteer-dashboard">Moje konto</Link>
                <button className="logout-btn" onClick={handleVolunteerLogout}>Wyloguj</button>
              </>
            )}
          </div>
        </nav>

        <div className="account-desktop">
          {!currentUser ? (
            <Link to="/volunteer-login" className="account-link">Konto</Link>
          ) : isAdmin ? (
            <>
              <Link to="/admin" className="account-link">Panel admina</Link>
              <button onClick={handleAdminLogout} className="logout-btn">Wyloguj</button>
            </>
          ) : (
            <>
              <Link to="/volunteer-dashboard" className="account-link">Moje konto</Link>
              <button onClick={handleVolunteerLogout} className="logout-btn">Wyloguj</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

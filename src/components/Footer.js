import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Lewa strona: logo + kontakt */}
        <div className="footer-left">
          <img src="/img/logo.png" alt="Logo" className="footer-logo" />
          <div className="footer-contact">
            <p>kontakt@adoptujprzyjaciela.pl</p>
            <p>+48 123 456 789</p>
          </div>
        </div>

        {/* Prawa strona: tekst © */}
        <div className="footer-right">
          <p>© {new Date().getFullYear()} Adoptuj Przyjaciela. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


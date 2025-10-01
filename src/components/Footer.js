import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Adoptuj Przyjaciela</p>
      <p>Kontakt: kontakt@adopcja.pl</p>
    </footer>
  );
}

export default Footer;

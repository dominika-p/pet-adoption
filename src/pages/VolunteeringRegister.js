import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./VolunteeringRegister.css";

const VolunteeringRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // hook do nawigacji

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rejestracja:", formData);
    alert("Konto zostało utworzone!");
    navigate("/volunteer-login"); // przeniesienie na stronę logowania
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Rejestracja wolontariusza</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Imię:</label>
          <input type="text" name="name" required onChange={handleChange} />

          <label>Data urodzenia:</label>
          <input type="date" name="birthDate" required onChange={handleChange} />

          <label>Numer telefonu:</label>
          <input type="tel" name="phone" required onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" required onChange={handleChange} />

          <label>Hasło:</label>
          <input type="password" name="password" required onChange={handleChange} />

          <button type="submit" className="auth-btn">Utwórz konto</button>
        </form>

        <p className="auth-switch">
          Masz już konto? <Link to="/volunteer-login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
};

export default VolunteeringRegister;





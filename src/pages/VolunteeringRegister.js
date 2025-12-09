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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/volunteers/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Błąd podczas rejestracji");
    }

    alert("Konto zostało utworzone!");
    navigate("/volunteer-login");

  } catch (error) {
    console.error(error);
    alert("Nie udało się zarejestrować");
  }
};

  return (
    <div
      className="auth-page"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(/img/wolontariat2.jpg) center/cover no-repeat`,
        minHeight: "100vh",
      }}
    >
      <div className="auth-container">
        <h2>Rejestracja wolontariusza</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Imię:</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label>Data urodzenia:</label>
          <input
            type="date"
            name="birthDate"
            required
            value={formData.birthDate}
            onChange={handleChange}
          />

          <label>Numer telefonu:</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label>Hasło:</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="auth-btn">
            Utwórz konto
          </button>
        </form>

        <p className="auth-switch">
          Masz już konto? <Link to="/volunteer-login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
};

export default VolunteeringRegister;






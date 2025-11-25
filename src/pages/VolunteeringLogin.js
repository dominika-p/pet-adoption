import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./VolunteeringLogin.css";

const VolunteeringLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/volunteer-dashboard");
  };

  return (
    <div
      className="auth-page"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(/img/wolontariat2.jpg) center/cover no-repeat`,
      }}
    >
      <div className="auth-container">
        <h3>Logowanie wolontariusza</h3>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Hasło:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="auth-btn">Zaloguj się</button>
        </form>
        <p className="auth-switch">
          Nie masz konta? <Link to="/volunteer-register">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
};

export default VolunteeringLogin;







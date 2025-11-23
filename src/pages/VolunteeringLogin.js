import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./VolunteeringLogin.css";

const VolunteeringLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ustawiamy usera po zalogowaniu
    setUser({ email });
    navigate("/volunteer-dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h3>Logowanie wolontariusza</h3>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email:</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Hasło:</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
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





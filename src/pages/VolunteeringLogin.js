import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { UserContext } from "../context/UserContext"; // <- dodajemy context
import "./VolunteeringLogin.css";

const VolunteeringLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // <- pobieramy setter z contextu

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/volunteers/login", {
        email,
        password
      });

      const loggedUser = response.data;
      console.log("Zalogowany użytkownik:", loggedUser);

      if (!loggedUser.id) {
        return alert("Backend nie zwraca id użytkownika!");
      }

      // zapisujemy zarówno w localStorage, jak i w context
      localStorage.setItem("volunteer", JSON.stringify(loggedUser));
      setUser(loggedUser); // <- tutaj aktualizujemy context, Header od razu się przeładuje
      navigate("/volunteer-dashboard");
    } catch (err) {
      alert("Błędny email lub hasło");
    }
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

import React, { useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "haslo123") {
      setIsLoggedIn(true);
    } else {
      alert("Niepoprawny login lub hasło");
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        className="admin-login"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/img/tlo.jpg) center/cover no-repeat`,
        }}
      >
        <h2>Panel Administratora</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Zaloguj się</button>
        </form>
      </div>
    );
  }

  return (
    <div
      className="admin-panel"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/img/tlo.jpg) center/cover no-repeat`,
      }}
    >
      <h2>Witaj, Administratorze!</h2>
      <div className="admin-buttons">
        <button>Dodaj nowego zwierzaka</button>
        <button>Dodaj post na bloga</button>
        <button>Zarządzaj wiadomościami</button>
      </div>
    </div>
  );
};

export default Admin;





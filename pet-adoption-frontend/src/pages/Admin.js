import React, { useContext, useState } from "react";
import AdminPanel from "./AdminPanel";
import { AuthContext } from "../context/AuthContext";
import './Admin.css';

const Admin = () => {
  const { user, login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // sztywne dane admina
    if (username === "admin" && password === "haslo123") {
      login({ username: "admin", role: "admin" });
    } else {
      alert("Niepoprawny login lub hasło");
    }
  };

  if (user && user.role === "admin") {
    return <AdminPanel />;
  }

  return (
    <div
      className="admin-page"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('/img/admintlo.jpg') center/cover no-repeat`,
      }}
    >
      <div className="admin-container">
        <h2>Administrator</h2>
        <form onSubmit={handleLogin} className="admin-form">
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
    </div>
  );
};

export default Admin;

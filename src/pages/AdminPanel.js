import React from "react";
import PostForm from "../components/PostForm";
import AnimalForm from "../components/AnimalForm";

const AdminPanel = ({ onLogout }) => {
  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", textAlign: "center" }}>
      <h2>Panel Admina</h2>
      <button
        onClick={onLogout}
        style={{ marginBottom: "20px", padding: "8px 15px", cursor: "pointer" }}
      >
        Wyloguj
      </button>

      <h3>Dodaj nowy post</h3>
      <PostForm />

      <h3>Dodaj nowego zwierzaka</h3>
      <AnimalForm />
    </div>
  );
};

export default AdminPanel;

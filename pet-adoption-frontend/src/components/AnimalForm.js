import React, { useState } from "react";

const AnimalForm = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("Pies");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dodaj zwierzaka:", { name, species });
    // Tutaj wywołaj API np. fetch("/api/animals", ...)
    setName("");
    setSpecies("Pies");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <input
        type="text"
        placeholder="Imię zwierzaka"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        <option value="Pies">Pies</option>
        <option value="Kot">Kot</option>
      </select>
      <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
        Dodaj zwierzaka
      </button>
    </form>
  );
};

export default AnimalForm;

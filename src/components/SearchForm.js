import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onFilter }) {
  const [species, setSpecies] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(""); // dodatkowe pole na wiek

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ species, size, gender, age });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* Gatunek */}
      <select value={species} onChange={(e) => setSpecies(e.target.value)}>
        <option value="">Gatunek</option>
        <option value="Pies">Pies</option>
        <option value="Kot">Kot</option>
      </select>

      {/* Wielkość — tylko dla psa */}
      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        disabled={species === "Kot"}
      >
        <option value="">Wielkość</option>
        <option value="Mały">Mały</option>
        <option value="Średni">Średni</option>
        <option value="Duży">Duży</option>
      </select>

      {/* Wiek */}
      <select value={age} onChange={(e) => setAge(e.target.value)}>
        <option value="">Wiek</option>
        <option value="Młody">Młody</option>
        <option value="Dorosły">Dorosły</option>
        <option value="Senior">Senior</option>
      </select>

      {/* Płeć */}
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Płeć</option>
        <option value="On">On</option>
        <option value="Ona">Ona</option>
      </select>

      <button type="submit">Szukaj</button>
    </form>
  );
}

export default SearchForm;


import React, { useState, useEffect } from "react";
import animalsData from "../data/animalsData";
import AdoptionAnimalCard from "../components/AdoptionAnimalCard";
import AnimalModal from "../components/AnimalModal";
import "./AdoptionPage.css";

const AdoptionPage = () => {
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState(animalsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const itemsPerPage = 20;

  useEffect(() => {
    // Filtrowanie po gatunku od razu po zmianie
    if (speciesFilter && speciesFilter !== "Wszystkie") {
      const result = animalsData.filter(animal => animal.species === speciesFilter);
      setFilteredAnimals(result);
    } else {
      setFilteredAnimals(animalsData);
    }
    setCurrentPage(1);
  }, [speciesFilter]);

  const normalizeSize = (size) => {
    if (!size) return "";
    return size.toLowerCase().replace(/a$/, ""); // usuwa końcówkę 'a' dla żeńskiej formy
  };

  const handleFilter = () => {
    const result = animalsData.filter(animal => {
      // Filtracja wielkości
      let sizeMatch = true;
      if (sizeFilter) {
        sizeMatch = normalizeSize(animal.size) === normalizeSize(sizeFilter);
      }

      // Filtracja wieku po miesiącach
      let ageMatch = true;
      if (ageFilter && animal.ageMonths != null) {
        if (ageFilter === "Młody") ageMatch = animal.ageMonths <= 12;
        else if (ageFilter === "Dorosły") ageMatch = animal.ageMonths >= 13 && animal.ageMonths <= 84;
        else if (ageFilter === "Senior") ageMatch = animal.ageMonths >= 85;
      }

      return (
        (speciesFilter === "" || speciesFilter === "Wszystkie" || animal.species === speciesFilter) &&
        sizeMatch &&
        ageMatch &&
        (genderFilter === "" || animal.gender === genderFilter)
      );
    });

    setFilteredAnimals(result);
    setCurrentPage(1);
  };

  const displayedAnimals = filteredAnimals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);

  const resetFilters = () => {
    setSpeciesFilter("");
    setAgeFilter("");
    setSizeFilter("");
    setGenderFilter("");
    setFilteredAnimals(animalsData);
    setCurrentPage(1);
  };

  return (
    <div className="adoption-page">
      <h2 className="adoption-page__title">Zwierzaki, które czekają na nowy dom</h2>

      <div className="adoption-filters">
        <div className="adoption-type-row">
          <button
            className={speciesFilter === "Pies" ? "active" : ""}
            onClick={() => setSpeciesFilter("Pies")}
          >
            Pies
          </button>
          <button
            className={speciesFilter === "Kot" ? "active" : ""}
            onClick={() => setSpeciesFilter("Kot")}
          >
            Kot
          </button>
          <button
            className={speciesFilter === "" ? "active" : ""}
            onClick={() => setSpeciesFilter("")}
          >
            Wszystkie
          </button>
        </div>

        <div className="adoption-traits-row">
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            disabled={speciesFilter === "Kot"}
          >
            <option value="">Wielkość</option>
            <option value="Mały">Mały</option>
            <option value="Średni">Średni</option>
            <option value="Duży">Duży</option>
          </select>

          <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
            <option value="">Wiek</option>
            <option value="Młody">Młody</option>
            <option value="Dorosły">Dorosły</option>
            <option value="Senior">Senior</option>
          </select>

          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
            <option value="">Płeć</option>
            <option value="On">On</option>
            <option value="Ona">Ona</option>
          </select>

          <button className="adoption-filter-btn" onClick={handleFilter}>Filtruj</button>
          <button className="adoption-filter-btn reset-btn" onClick={resetFilters}>Reset</button>
        </div>
      </div>

      <div className="adoption-page__grid">
        {displayedAnimals.map((animal, index) => (
          <div key={index} onClick={() => setSelectedAnimal(animal)}>
            <AdoptionAnimalCard {...animal} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="adoption-page__pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>Następna</button>
          )}
        </div>
      )}

      {selectedAnimal && (
        <AnimalModal
          animal={selectedAnimal}
          onClose={() => setSelectedAnimal(null)}
          showAdoptionButton={true}
        />
      )}
    </div>
  );
};

export default AdoptionPage;




















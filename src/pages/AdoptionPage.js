import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import animalsData from "../data/animalsData";
import AdoptionAnimalCard from "../components/AdoptionAnimalCard";
import "./AdoptionPage.css";

const AdoptionPage = () => {
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState(animalsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const navigate = useNavigate();
  const itemsPerPage = 20;

  useEffect(() => {
    if (speciesFilter) {
      let result = animalsData.filter((animal) =>
        speciesFilter === "Wszystkie" ? true : animal.species === speciesFilter
      );
      setFilteredAnimals(result);
      setCurrentPage(1);
    } else {
      setFilteredAnimals(animalsData);
    }
  }, [speciesFilter]);

  const handleFilter = () => {
    const result = animalsData.filter((animal) => {
      return (
        (speciesFilter === "" || speciesFilter === "Wszystkie" || animal.species === speciesFilter) &&
        (ageFilter === "" || animal.age === ageFilter) &&
        (sizeFilter === "" || animal.size === sizeFilter) &&
        (genderFilter === "" || animal.gender === genderFilter)
      );
    });
    setFilteredAnimals(result);
    setCurrentPage(1);
    setAgeFilter("");
    setSizeFilter("");
    setGenderFilter("");
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
            <option value="One">One</option>
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

      {/* Modal */}
      {selectedAnimal && (
        <div className="modal-overlay" onClick={() => setSelectedAnimal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedAnimal.name}</h3>
            <img src={selectedAnimal.img} alt={selectedAnimal.name} />
            <p><strong>Wiek:</strong> {selectedAnimal.age}</p>
            <p><strong>Wielkość:</strong> {selectedAnimal.size}</p>
            <p><strong>Czas w schronisku:</strong> {selectedAnimal.shelterTime}</p>
            <p><strong>Historia:</strong> {selectedAnimal.history}</p>
            <p><strong>Może mieszkać z innymi zwierzętami:</strong> {selectedAnimal.goodWithAnimals}</p>
            <p><strong>Może mieszkać z dziećmi:</strong> {selectedAnimal.goodWithKids}</p>

            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
              <button onClick={() => setSelectedAnimal(null)}>Zamknij</button>
              <button onClick={() => navigate(`/adoption-contact/${selectedAnimal.name}`)}>
                Skontaktuj się w sprawie adopcji
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionPage;
















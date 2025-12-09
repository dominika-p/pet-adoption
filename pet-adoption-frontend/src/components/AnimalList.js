import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // import hooka do nawigacji
import AnimalCard from "./AnimalCard";
import AnimalModal from "./AnimalModal"; // uniwersalny modal
import "./AnimalList.css";

const AnimalList = ({ animals }) => {
  const navigate = useNavigate(); // hook do programowego przekierowania
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedAnimal, setSelectedAnimal] = useState(null); // wybrany zwierzak do modala

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) setVisibleCount(4);
      else if (window.innerWidth < 992) setVisibleCount(6);
      else setVisibleCount(8);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handleShowMore = () => {
    navigate("/zwierzaki-do-adopcji");
  };

  return (
    <div className="animal-list-wrapper">
      <div className="animal-list">
        {animals.slice(0, visibleCount).map((animal, i) => (
          <div
            key={i}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedAnimal(animal)}
          >
            <AnimalCard
              name={animal.name}
              gender={animal.gender}
              age={animal.age}
              size={animal.size}
              img={animal.img}
            />
          </div>
        ))}
      </div>

      <button className="more-button" onClick={handleShowMore}>
        Zobacz więcej zwierzaków
      </button>

      {/* Modal */}
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

export default AnimalList;






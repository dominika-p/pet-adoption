import React, { useState, useEffect } from "react";
import AnimalCard from "./AnimalCard";
import "./AnimalList.css";

const AnimalList = ({ animals }) => {
  const [visibleCount, setVisibleCount] = useState(8); // ile kart pokazywać
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (!showAll) {
        if (window.innerWidth < 768) {
          setVisibleCount(4);
        } else if (window.innerWidth < 992) {
          setVisibleCount(6);
        } else {
          setVisibleCount(8);
        }
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [showAll]);

  const handleShowMore = () => {
    setShowAll(true);
    setVisibleCount(animals.length);
  };

  return (
    <div className="animal-list-wrapper">
      <div className="animal-list">
        {animals.slice(0, visibleCount).map((animal, i) => (
          <AnimalCard
            key={i}
            name={animal.name}
            gender={animal.gender}
            age={animal.age}
            size={animal.size}
            img={animal.img}
          />
        ))}
      </div>

      {/* Przycisk zawsze widoczny */}
      <button className="more-button" onClick={handleShowMore}>
        ZOBACZ WIĘCEJ ZWIERZAKÓW
      </button>
    </div>
  );
};

export default AnimalList;



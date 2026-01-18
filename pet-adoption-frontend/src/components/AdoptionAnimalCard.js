import React from "react";
import "./AdoptionAnimalCard.css";

// Zmieniamy propsy na te, które przychodzą z bazy (ageYears, ageMonths itd.)
const AdoptionAnimalCard = ({ name, gender, ageYears, ageMonths, size, img }) => {
  return (
    <div className="adoption-animal-card">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <div className="adoption-animal-card__info">
        {/* Wyświetlamy wiek na podstawie danych z bazy */}
        <span>Wiek: {ageYears} lat, {ageMonths} msc</span>
        <span>Wielkość: {size}</span>
        <span>Płeć: {gender}</span>
      </div>
    </div>
  );
};

export default AdoptionAnimalCard;
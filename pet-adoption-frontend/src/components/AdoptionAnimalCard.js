import React from "react";
import "./AdoptionAnimalCard.css";

const AdoptionAnimalCard = ({ name, gender, age, size, shelterTime, img }) => {
  return (
    <div className="adoption-animal-card">
      <img src={img} alt={name} />
      <h3>{name}</h3>
      <div className="adoption-animal-card__info">
        <span>Wiek: {age}</span>
        <span>Wielkość: {size}</span>
        {shelterTime && <span>Czas w schronisku: {shelterTime}</span>}
        <span>Płeć: {gender}</span>
      </div>
    </div>
  );
};

export default AdoptionAnimalCard;





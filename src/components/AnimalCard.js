import React from "react";
import "./AnimalCard.css";

const AnimalCard = ({ name, gender, age, size, img }) => {
  return (
    <div className="animal-card">
      <img src={img} alt={name} />
      <div className="card-content">
        <h4>{name}</h4>
        <p><strong>Płeć:</strong> {gender}</p>
        <p><strong>Wiek:</strong> {age}</p>
        <p><strong>Wielkość:</strong> {size}</p>
        <button>Zobacz więcej</button>
      </div>
    </div>
  );
};

export default AnimalCard;

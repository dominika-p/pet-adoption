import AnimalCard from "./AnimalCard";
import { animals } from "../data/animals";
import "./AnimalList.css";

function AnimalList() {
  return (
    <div className="animal-list">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}

export default AnimalList;

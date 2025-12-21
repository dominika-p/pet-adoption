import { useState } from 'react';
import './AdminAnimals.css';

const AdminAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: 'Pies',
    gender: 'On',
    ageYears: '',
    ageMonths: '',
    size: 'Średni',
    breed: '',
    history: '',
    goodWithAnimals: 'Tak',
    goodWithKids: 'Tak',
    img: '',
  });

  const addAnimal = () => {
    if (!newAnimal.name || !newAnimal.img) return;

    const totalMonths =
      (parseInt(newAnimal.ageYears) || 0) * 12 +
      (parseInt(newAnimal.ageMonths) || 0);
    let ageCategory = 'Młody';
    if (totalMonths >= 84) ageCategory = 'Senior';
    else if (totalMonths >= 12) ageCategory = 'Dorosły';

    setAnimals([{ ...newAnimal, id: Date.now(), age: ageCategory }, ...animals]);

    setNewAnimal({
      name: '',
      species: 'Pies',
      gender: 'On',
      ageYears: '',
      ageMonths: '',
      size: 'Średni',
      breed: '',
      history: '',
      goodWithAnimals: 'Tak',
      goodWithKids: 'Tak',
      img: '',
    });
  };

  const deleteAnimal = (id) => setAnimals(animals.filter((a) => a.id !== id));

  return (
    <div className="admin-section">
      <h2>Dodaj nowego zwierzaka</h2>

      <div className="animal-form">
        {/* Formularz niezmieniony */}
        <div className="form-row">
          <label>Imię zwierzaka:</label>
          <input
            type="text"
            value={newAnimal.name}
            onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })}
          />
        </div>

        <div className="form-row flex-small">
          <div className="inline-label">
            <label>Gatunek:</label>
            <select
              value={newAnimal.species}
              onChange={(e) => setNewAnimal({ ...newAnimal, species: e.target.value })}
            >
              <option value="Pies">Pies</option>
              <option value="Kot">Kot</option>
            </select>
          </div>
          <div className="inline-label">
            <label>Płeć:</label>
            <select
              value={newAnimal.gender}
              onChange={(e) => setNewAnimal({ ...newAnimal, gender: e.target.value })}
            >
              <option value="On">On</option>
              <option value="Ona">Ona</option>
            </select>
          </div>
          <div className="inline-label">
            <label>Wiek:</label>
            <div className="age-inputs">
              <input
                type="number"
                placeholder="Lata"
                value={newAnimal.ageYears}
                onChange={(e) => setNewAnimal({ ...newAnimal, ageYears: e.target.value })}
              />
              <input
                type="number"
                placeholder="Miesiące"
                value={newAnimal.ageMonths}
                onChange={(e) => setNewAnimal({ ...newAnimal, ageMonths: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="form-row flex-small">
          <div className="inline-label">
            <label>Rasa:</label>
            <input
              type="text"
              value={newAnimal.breed}
              onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })}
            />
          </div>

          {newAnimal.species === 'Pies' && (
            <div className="inline-label">
              <label>Wielkość:</label>
              <select
                value={newAnimal.size}
                onChange={(e) => setNewAnimal({ ...newAnimal, size: e.target.value })}
              >
                <option value="Mały">Mały</option>
                <option value="Średni">Średni</option>
                <option value="Duży">Duży</option>
              </select>
            </div>
          )}
        </div>

        <div className="form-row">
          <label>Opis / historia (max 250 słów):</label>
          <textarea
            value={newAnimal.history}
            onChange={(e) => setNewAnimal({ ...newAnimal, history: e.target.value })}
          />
        </div>

        <div className="form-row flex-small">
          <div className="inline-label">
            <label>Czy nadaje się z innymi zwierzętami?</label>
            <select
              value={newAnimal.goodWithAnimals}
              onChange={(e) => setNewAnimal({ ...newAnimal, goodWithAnimals: e.target.value })}
            >
              <option value="Tak">Tak</option>
              <option value="Nie">Nie</option>
              <option value="Nieznane">Nieznane</option>
            </select>
          </div>
          <div className="inline-label">
            <label>Czy nadaje się z dziećmi?</label>
            <select
              value={newAnimal.goodWithKids}
              onChange={(e) => setNewAnimal({ ...newAnimal, goodWithKids: e.target.value })}
            >
              <option value="Tak">Tak</option>
              <option value="Nie">Nie</option>
              <option value="Nieznane">Nieznane</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <label>Zdjęcie:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewAnimal({ ...newAnimal, img: URL.createObjectURL(e.target.files[0]) })
            }
          />
        </div>

        <button onClick={addAnimal}>Dodaj zwierzaka</button>
      </div>

      <h2>Lista zwierzaków</h2>
      <div className="animal-list">
        {animals.map((animal) => (
          <div key={animal.id} className="animal-item">
            <img src={animal.img} alt={animal.name} />
            <h4>{animal.name} ({animal.species})</h4>
            <p>
              {animal.ageYears} lat {animal.ageMonths} miesięcy, {animal.gender}{' '}
              {animal.species === 'Pies' && animal.size}
            </p>
            <p>{animal.breed}</p>
            <p>{animal.history}</p>
            <p>Zwierzęta: {animal.goodWithAnimals}, Dzieci: {animal.goodWithKids}</p>
            <div className="animal-buttons" style={{ justifyContent: 'flex-end' }}>
              <button onClick={() => deleteAnimal(animal.id)}>Usuń</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnimals;



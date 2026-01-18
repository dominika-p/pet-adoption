import { useState, useEffect } from 'react';
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
  });

  const [editingAnimal, setEditingAnimal] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const API_URL = 'http://localhost:5000/api/animals';

  // Pobieranie zwierząt przy starcie
  useEffect(() => {
  const fetchAnimals = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/animals");
      if (res.ok) {
        const data = await res.json();
        setAnimals(data);
      }
    } catch (e) {
      console.error("Błąd pobierania danych:", e);
    }
  };
  fetchAnimals();
}, []);

  const addAnimal = async () => {
  console.log("Próba dodania zwierzaka...");

  if (!newAnimal.name || !selectedFile) {
    alert("Uzupełnij imię i zdjęcie");
    return;
  }

  const formData = new FormData();
  
  // 1. Dodajemy plik (musi mieć klucz "file" zgodnie z @RequestPart("file"))
  formData.append("file", selectedFile);

  // 2. Dodajemy pola tekstowe i liczbowe pojedynczo, by uniknąć błędów mapowania
  formData.append("name", newAnimal.name);
  formData.append("species", newAnimal.species);
  formData.append("gender", newAnimal.gender);
  
  // Ważne: Konwertujemy na 0 jeśli wartość jest pusta/null, aby Java Integer nie dostał błędu
  formData.append("ageYears", (newAnimal.ageYears === '' || newAnimal.ageYears === null) ? 0 : newAnimal.ageYears);
  formData.append("ageMonths", (newAnimal.ageMonths === '' || newAnimal.ageMonths === null) ? 0 : newAnimal.ageMonths);
  
  formData.append("size", newAnimal.size || "Średni");
  formData.append("breed", newAnimal.breed || "");
  formData.append("history", newAnimal.history || "");
  formData.append("goodWithAnimals", newAnimal.goodWithAnimals);
  formData.append("goodWithKids", newAnimal.goodWithKids);

  try {
    const res = await fetch("http://localhost:5000/api/animals", {
      method: "POST",
      // NIE dodawaj tutaj headers: { 'Content-Type': ... }! 
      // Przeglądarka musi sama wygenerować nagłówek z boundary.
      body: formData,
    });

    if (!res.ok) {
      // Spróbujmy pobrać komunikat błędu z serwera, jeśli istnieje
      const errorText = await res.text();
      console.error("Błąd serwera (Status 400):", errorText);
      throw new Error(`Serwer zwrócił błąd: ${res.status}`);
    }

    const savedAnimal = await res.json();
    console.log("Dodano zwierzaka:", savedAnimal);

    // Aktualizacja listy w UI
    setAnimals(prev => [savedAnimal, ...prev]);
    
    // Resetowanie formularza
    setSelectedFile(null);
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
    });

    alert("Zwierzak został pomyślnie dodany!");

  } catch (err) {
    console.error("Błąd wysyłania:", err);
    alert("Wystąpił błąd podczas zapisywania: " + err.message);
  }
};


  const deleteAnimal = async (id) => {
  if (window.confirm("Czy na pewno chcesz usunąć tego zwierzaka?")) {
    try {
      const res = await fetch(`http://localhost:5000/api/animals/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAnimals(animals.filter(animal => animal.id !== id));
        alert("Zwierzak został usunięty.");
      } else {
        alert("Błąd podczas usuwania.");
      }
    } catch (err) {
      console.error("Błąd sieci:", err);
    }
  }
};

const handleUpdateAnimal = async (updatedAnimal) => {
  try {
    const response = await fetch(`http://localhost:5000/api/animals/${updatedAnimal.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAnimal),
    });

    if (response.ok) {
      setAnimals(animals.map(a => a.id === updatedAnimal.id ? updatedAnimal : a));
      setEditingAnimal(null); 
      alert("Dane zostały pomyślnie zaktualizowane!");
    } else {
      alert("Błąd serwera podczas aktualizacji.");
    }
  } catch (error) {
    alert("Błąd połączenia z serwerem.");
  }
};

  console.log("DEBUG: AdminAnimals render")

  return (
  <div className="admin-section">
    <h2>Dodaj nowego zwierzaka</h2>

    <div className="animal-form">
      <div className="form-row">
        <div className="inline-label">
          <label>Imię zwierzaka:</label>
          <input
            type="text"
            value={newAnimal.name ?? ''}
            onChange={e => setNewAnimal({ ...newAnimal, name: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="inline-label">
          <label>Gatunek:</label>
          <select
            value={newAnimal.species}
            onChange={e => setNewAnimal({ ...newAnimal, species: e.target.value })}
          >
            <option value="Pies">Pies</option>
            <option value="Kot">Kot</option>
          </select>
        </div>
        <div className="inline-label">
          <label>Płeć:</label>
          <select
            value={newAnimal.gender}
            onChange={e => setNewAnimal({ ...newAnimal, gender: e.target.value })}
          >
            <option value="On">On</option>
            <option value="Ona">Ona</option>
          </select>
        </div>
        <div className="inline-label">
          <label>Wiek (Lata/Miesiące):</label>
          <div className="age-inputs">
            <input
              type="number"
              placeholder="Lata"
              value={newAnimal.ageYears ?? ''}
              onChange={e => setNewAnimal({ ...newAnimal, ageYears: e.target.value === '' ? '' : Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Msc"
              value={newAnimal.ageMonths ?? ''}
              onChange={e => setNewAnimal({ ...newAnimal, ageMonths: e.target.value === '' ? '' : Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="inline-label">
          <label>Rasa:</label>
          <input
            type="text"
            value={newAnimal.breed ?? ''}
            onChange={e => setNewAnimal({ ...newAnimal, breed: e.target.value })}
          />
        </div>
        <div className="inline-label">
          <label>Wielkość:</label>
          <select
            value={newAnimal.size}
            onChange={e => setNewAnimal({ ...newAnimal, size: e.target.value })}
          >
            <option value="Mały">Mały</option>
            <option value="Średni">Średni</option>
            <option value="Duży">Duży</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="inline-label">
          <label>Opis / historia:</label>
          <textarea
            value={newAnimal.history ?? ''}
            onChange={e => setNewAnimal({ ...newAnimal, history: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="inline-label">
          <label>Zdjęcie:</label>
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </div>
      </div>

      <button onClick={addAnimal} className="submit-btn">Dodaj zwierzaka</button>
    </div>

    <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid #d2bfa3' }} />

    <h2 style={{ marginTop: '40px', color: '#ae5224' }}>Lista zwierzaków</h2>
<div className="animal-grid" style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
  gap: '20px', 
  width: '100%' 
}}>
  {animals.map(animal => (
    <div key={animal.id} className="animal-card" style={{ 
      background: 'white', 
      borderRadius: '15px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="card-img-container" style={{ height: '180px', width: '100%' }}>
        {animal.img && (
          <img 
            src={animal.img} 
            alt={animal.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        )}
      </div>
      <div className="card-content" style={{ padding: '15px' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{animal.name}</h4>
        <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><strong>Gatunek:</strong> {animal.species}</p>
        <p style={{ margin: '5px 0', fontSize: '0.9rem' }}><strong>Płeć:</strong> {animal.gender}</p>
        
        <div className="card-actions" style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: '15px' 
        }}>
          <button 
            onClick={() => setEditingAnimal(animal)} 
            style={{ 
              flex: 1, padding: '8px', border: 'none', borderRadius: '8px', 
              backgroundColor: '#e78c58', color: 'white', cursor: 'pointer' 
            }}
          >
            Szczegóły
          </button>
          <button 
            onClick={() => deleteAnimal(animal.id)} 
            style={{ 
              padding: '8px', border: 'none', borderRadius: '8px', 
              backgroundColor: '#f44336', color: 'white', cursor: 'pointer' 
            }}
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    {/* MODAL EDYCJI / SZCZEGÓŁÓW */}
{editingAnimal && (
  <div className="edit-modal-overlay">
    <div className="edit-modal-window">
      {/* LEWA STRONA */}
      <div className="edit-modal-sidebar">
        <h3>Edytuj:<br/>{editingAnimal.name}</h3>
      </div>

      {/* ŚRODEK - FORMULARZ */}
      <div className="edit-modal-body">
        <div className="edit-modal-grid">
          <div className="edit-modal-field">
            <label>Imię:</label>
            <input type="text" value={editingAnimal.name} onChange={(e) => setEditingAnimal({...editingAnimal, name: e.target.value})} />
          </div>

          <div className="edit-modal-field">
            <label>Gatunek:</label>
            <select value={editingAnimal.species} onChange={(e) => setEditingAnimal({...editingAnimal, species: e.target.value})}>
              <option value="Pies">Pies</option>
              <option value="Kot">Kot</option>
            </select>
          </div>

          <div className="edit-modal-field">
            <label>Płeć:</label>
            <select value={editingAnimal.gender} onChange={(e) => setEditingAnimal({...editingAnimal, gender: e.target.value})}>
              <option value="On">On</option>
              <option value="Ona">Ona</option>
            </select>
          </div>

          <div className="edit-modal-field">
            <label>Rasa:</label>
            <input type="text" value={editingAnimal.breed || ''} onChange={(e) => setEditingAnimal({...editingAnimal, breed: e.target.value})} />
          </div>

          <div className="edit-modal-field">
            <label>Wiek (Lata / Miesiące):</label>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input type="number" value={editingAnimal.ageYears} onChange={(e) => setEditingAnimal({...editingAnimal, ageYears: parseInt(e.target.value) || 0})} />
              <input type="number" value={editingAnimal.ageMonths} onChange={(e) => setEditingAnimal({...editingAnimal, ageMonths: parseInt(e.target.value) || 0})} />
            </div>
          </div>

          <div className="edit-modal-field">
            <label>Wielkość:</label>
            <select value={editingAnimal.size} onChange={(e) => setEditingAnimal({...editingAnimal, size: e.target.value})}>
              <option value="Mały">Mały</option>
              <option value="Średni">Średni</option>
              <option value="Duży">Duży</option>
            </select>
          </div>

          <div className="edit-modal-field">
            <label>Z innymi zwierzętami:</label>
            <select value={editingAnimal.goodWithAnimals} onChange={(e) => setEditingAnimal({...editingAnimal, goodWithAnimals: e.target.value})}>
              <option value="Tak">Tak</option>
              <option value="Nie">Nie</option>
            </select>
          </div>

          <div className="edit-modal-field">
            <label>Dobre dla dzieci:</label>
            <select value={editingAnimal.goodWithKids} onChange={(e) => setEditingAnimal({...editingAnimal, goodWithKids: e.target.value})}>
              <option value="Tak">Tak</option>
              <option value="Nie">Nie</option>
            </select>
          </div>

          <div className="edit-modal-field edit-full-row">
            <label>Historia:</label>
            <textarea value={editingAnimal.history} onChange={(e) => setEditingAnimal({...editingAnimal, history: e.target.value})} />
          </div>
        </div>
      </div>

      {/* PRAWA STRONA - PRZYCISKI */}
      <div className="edit-modal-actions-sidebar">
        <button className="edit-cancel-btn" onClick={() => setEditingAnimal(null)}>Anuluj</button>
        <button className="edit-save-btn" onClick={() => handleUpdateAnimal(editingAnimal)}>Zapisz</button>
      </div>
    </div>
  </div>
)}
  </div>
);
};

export default AdminAnimals;

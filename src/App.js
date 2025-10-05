import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdoptionPage from './pages/AdoptionPage'; // import strony zwierzaków
import AdoptionContact from './pages/AdoptionContact'; // import nowej strony kontaktowej
import "./styles/variables.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zwierzak-do-adopcji" element={<AdoptionPage />} /> {/* strona zwierzaków */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/adoption-contact/:animalName" element={<AdoptionContact />} /> {/* nowa trasa kontaktowa */}
      </Routes>
    </Router>
  );
}

export default App;






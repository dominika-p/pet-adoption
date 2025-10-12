// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdoptionPage from './pages/AdoptionPage';
import AdoptionContact from './pages/AdoptionContact';
import BlogPage from './pages/BlogPage';       // strona bloga
import BlogArticle from './pages/BlogArticle'; // pojedynczy artykuł

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zwierzak-do-adopcji" element={<AdoptionPage />} />
        <Route path="/adopcja" element={<AdoptionPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adoption-contact/:animalName" element={<AdoptionContact />} />
        <Route path="/blog" element={<BlogPage />} />          {/* strona główna bloga */}
        <Route path="/blog/:slug" element={<BlogArticle />} /> {/* pojedynczy artykuł */}
      </Routes>
    </Router>
  );
}

export default App;









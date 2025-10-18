import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AdoptionPage from "./pages/AdoptionPage";
import AdoptionContact from "./pages/AdoptionContact";
import BlogPage from "./pages/BlogPage";
import BlogArticle from "./pages/BlogArticle";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import HelpPage from "./pages/HelpPage"; // <- strona "Jak pomóc?"
import TimeWithAnimals from "./pages/TimeWithAnimals"; // <- strona "Czas ze zwierzakiem"
import VolunteeringPage from "./pages/VolunteeringPage"; // <- nowa strona "Wolontariat"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zwierzaki-do-adopcji" element={<AdoptionPage />} />
        <Route path="/adopcja" element={<AdoptionPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/adoption-contact/:animalName"
          element={<AdoptionContact />}
        />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/o-nas" element={<AboutUs />} />
        <Route path="/help" element={<HelpPage />} /> {/* <- dodane */}
        <Route path="/czas-ze-zwierzakiem" element={<TimeWithAnimals />} /> {/* <- dodane */}
        <Route path="/wolontariat" element={<VolunteeringPage />} /> {/* <- dodane */}
      </Routes>
    </Router>
  );
}

export default App;



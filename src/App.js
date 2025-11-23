import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Admin from './pages/Admin'
import AdoptionPage from './pages/AdoptionPage'
import AdoptionContact from './pages/AdoptionContact'
import BlogPage from './pages/BlogPage'
import BlogArticle from './pages/BlogArticle'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'
import HelpPage from './pages/HelpPage'
import TimeWithAnimals from './pages/TimeWithAnimals'
import VolunteeringPage from './pages/VolunteeringPage'

// nowe importy
import VolunteeringLogin from './pages/VolunteeringLogin'
import VolunteeringRegister from './pages/VolunteeringRegister'
import VolunteeringDashboard from './pages/VolunteeringDashboard'
import ScrollToTop from './components/ScrollToTop'

// Import Contextu użytkownika
import { UserContext } from './context/UserContext'

function App() {
  const [user, setUser] = useState(null) // null = niezalogowany, obiekt = zalogowany

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/zwierzaki-do-adopcji' element={<AdoptionPage />} />
          <Route path='/adopcja' element={<AdoptionPage />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/adoption-contact/:animalName' element={<AdoptionContact />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/blog/:slug' element={<BlogArticle />} />
          <Route path='/kontakt' element={<Contact />} />
          <Route path='/o-nas' element={<AboutUs />} />
          <Route path='/help' element={<HelpPage />} />
          <Route path='/czas-ze-zwierzakiem' element={<TimeWithAnimals />} />
          <Route path='/wolontariat' element={<VolunteeringPage />} />
          <Route path='/volunteer-login' element={<VolunteeringLogin />} />
          <Route path='/volunteer-register' element={<VolunteeringRegister />} />
          <Route path='/volunteer-dashboard' element={<VolunteeringDashboard />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App


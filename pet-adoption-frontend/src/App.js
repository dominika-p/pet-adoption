import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home'
import Admin from './pages/Admin'
import AdminPanel from './pages/AdminPanel'
import AdoptionPage from './pages/AdoptionPage'
import AdoptionContact from './pages/AdoptionContact'
import BlogPage from './pages/BlogPage'
import BlogArticle from './pages/BlogArticle'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'
import HelpPage from './pages/HelpPage'
import TimeWithAnimals from './pages/TimeWithAnimals'
import VolunteeringPage from './pages/VolunteeringPage'

import VolunteeringLogin from './pages/VolunteeringLogin'
import VolunteeringRegister from './pages/VolunteeringRegister'
import VolunteeringDashboard from './pages/VolunteeringDashboard'
import ScrollToTop from './components/ScrollToTop'

import { UserProvider } from './context/UserContext'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './pages/PrivateRoute'

function App() {
	return (
		<UserProvider>
			<AuthProvider>
				<Router>
					<ScrollToTop />
					<Header />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/zwierzaki-do-adopcji' element={<AdoptionPage />} />
						<Route path='/adopcja' element={<AdoptionPage />} />
						<Route path='/adoption-contact/:animalName' element={<AdoptionContact />} />
						<Route path='/blog' element={<BlogPage />} />
						<Route path='/blog/:id' element={<BlogArticle />} />
						<Route path='/kontakt' element={<Contact />} />
						<Route path='/o-nas' element={<AboutUs />} />
						<Route path='/help' element={<HelpPage />} />
						<Route path='/czas-ze-zwierzakiem' element={<TimeWithAnimals />} />
						<Route path='/wolontariat' element={<VolunteeringPage />} />
						<Route path='/volunteer-login' element={<VolunteeringLogin />} />
						<Route path='/volunteer-register' element={<VolunteeringRegister />} />
						<Route path='/volunteer-dashboard' element={<VolunteeringDashboard />} />
						<Route path='/admin' element={<Admin />} />
						<Route
							path='/admin/panel'
							element={
								<PrivateRoute>
									<AdminPanel />
								</PrivateRoute>
							}
						/>
					</Routes>
				</Router>
			</AuthProvider>
		</UserProvider>
	)
}

export default App

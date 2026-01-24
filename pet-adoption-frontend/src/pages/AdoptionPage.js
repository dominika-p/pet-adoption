import React, { useState, useEffect, useCallback } from 'react'
import AdoptionAnimalCard from '../components/AdoptionAnimalCard'
import AnimalModal from '../components/AnimalModal'
import './AdoptionPage.css'

const AdoptionPage = () => {
	const [allAnimals, setAllAnimals] = useState([])
	const [speciesFilter, setSpeciesFilter] = useState('')
	const [ageFilter, setAgeFilter] = useState('')
	const [sizeFilter, setSizeFilter] = useState('')
	const [genderFilter, setGenderFilter] = useState('')
	const [filteredAnimals, setFilteredAnimals] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedAnimal, setSelectedAnimal] = useState(null)
	const [loading, setLoading] = useState(true)

	const itemsPerPage = 20

	useEffect(() => {
		const fetchAnimals = async () => {
			try {
				const response = await fetch('http://localhost:5000/api/animals')
				const data = await response.json()
				console.log('DANE Z BAZY:', data)
				setAllAnimals(data)
				setFilteredAnimals(data)
			} catch (error) {
				console.error('Błąd pobierania:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchAnimals()
	}, [])

	const normalizeSize = size => {
		if (!size) return ''
		return size.toLowerCase().replace(/a$/, '')
	}

	// 🔹 Użycie useCallback, żeby handleFilter był stabilny
	const handleFilter = useCallback(() => {
		const result = allAnimals.filter(animal => {
			const speciesMatch =
				speciesFilter === '' || speciesFilter === 'Wszystkie' || animal.species === speciesFilter

			const sizeMatch = sizeFilter
				? normalizeSize(animal.size) === normalizeSize(sizeFilter)
				: true

			let ageMatch = true
			if (ageFilter) {
				const totalMonths = (animal.ageYears || 0) * 12 + (animal.ageMonths || 0)
				if (ageFilter === 'Młody') ageMatch = totalMonths <= 12
				else if (ageFilter === 'Dorosły') ageMatch = totalMonths > 12 && totalMonths <= 84
				else if (ageFilter === 'Senior') ageMatch = totalMonths > 84
			}

			const genderMatch = genderFilter === '' || animal.gender === genderFilter

			return speciesMatch && sizeMatch && ageMatch && genderMatch
		})

		setFilteredAnimals(result)
		setCurrentPage(1)
	}, [allAnimals, speciesFilter, sizeFilter, ageFilter, genderFilter])

	useEffect(() => {
		handleFilter()
	}, [handleFilter])

	const resetFilters = () => {
		setSpeciesFilter('')
		setAgeFilter('')
		setSizeFilter('')
		setGenderFilter('')
		setCurrentPage(1)
	}

	const displayedAnimals = filteredAnimals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage)

	if (loading) return <div className='loading'>Ładowanie zwierzaków...</div>

	return (
		<div className='adoption-page'>
			<h2 className='adoption-page__title'>Zwierzaki, które czekają na nowy dom</h2>

			<div className='adoption-filters'>
				<div className='adoption-type-row'>
					<button className={speciesFilter === 'Pies' ? 'active' : ''} onClick={() => setSpeciesFilter('Pies')}>
						Pies
					</button>
					<button className={speciesFilter === 'Kot' ? 'active' : ''} onClick={() => setSpeciesFilter('Kot')}>
						Kot
					</button>
					<button className={speciesFilter === '' ? 'active' : ''} onClick={() => setSpeciesFilter('')}>
						Wszystkie
					</button>
				</div>

				<div className='adoption-traits-row'>
					<select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)} disabled={speciesFilter === 'Kot'}>
						<option value=''>Wielkość</option>
						<option value='Mały'>Mały</option>
						<option value='Średni'>Średni</option>
						<option value='Duży'>Duży</option>
					</select>

					<select value={ageFilter} onChange={e => setAgeFilter(e.target.value)}>
						<option value=''>Wiek</option>
						<option value='Młody'>Młody</option>
						<option value='Dorosły'>Dorosły</option>
						<option value='Senior'>Senior</option>
					</select>

					<select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
						<option value=''>Płeć</option>
						<option value='On'>On</option>
						<option value='Ona'>Ona</option>
					</select>

					<button className='adoption-filter-btn reset-btn' onClick={resetFilters}>
						Reset
					</button>
				</div>
			</div>

			<div className='adoption-page__grid'>
				{displayedAnimals.length > 0 ? (
					displayedAnimals.map(animal => (
						<div key={animal.id} onClick={() => setSelectedAnimal(animal)} style={{ cursor: 'pointer' }}>
							<AdoptionAnimalCard {...animal} />
						</div>
					))
				) : (
					<p className='no-results'>Brak zwierzaków spełniających kryteria.</p>
				)}
			</div>

			{}
			{totalPages > 1 && (
				<div className='adoption-page__pagination'>
					{Array.from({ length: totalPages }, (_, i) => (
						<button key={i} className={currentPage === i + 1 ? 'active' : ''} onClick={() => setCurrentPage(i + 1)}>
							{i + 1}
						</button>
					))}
				</div>
			)}

			{selectedAnimal && (
				<AnimalModal animal={selectedAnimal} onClose={() => setSelectedAnimal(null)} showAdoptionButton={true} />
			)}
		</div>
	)
}

export default AdoptionPage

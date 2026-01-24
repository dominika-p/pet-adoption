import { useState } from 'react'
import './SearchForm.css'

function SearchForm({ onFilter }) {
	const [species, setSpecies] = useState('')
	const [size, setSize] = useState('')
	const [gender, setGender] = useState('')
	const [age, setAge] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		onFilter({ species, size, gender, age })
	}

	return (
		<form className='search-form' onSubmit={handleSubmit}>
			{}
			<select value={species} onChange={e => setSpecies(e.target.value)}>
				<option value=''>Gatunek</option>
				<option value='Pies'>Pies</option>
				<option value='Kot'>Kot</option>
			</select>

			{}
			<select value={size} onChange={e => setSize(e.target.value)} disabled={species === 'Kot'}>
				<option value=''>Wielkość</option>
				<option value='Mały'>Mały</option>
				<option value='Średni'>Średni</option>
				<option value='Duży'>Duży</option>
			</select>

			{}
			<select value={age} onChange={e => setAge(e.target.value)}>
				<option value=''>Wiek</option>
				<option value='Młody'>Młody</option>
				<option value='Dorosły'>Dorosły</option>
				<option value='Senior'>Senior</option>
			</select>

			{}
			<select value={gender} onChange={e => setGender(e.target.value)}>
				<option value=''>Płeć</option>
				<option value='On'>On</option>
				<option value='Ona'>Ona</option>
			</select>

			<button type='submit'>Szukaj</button>
		</form>
	)
}

export default SearchForm

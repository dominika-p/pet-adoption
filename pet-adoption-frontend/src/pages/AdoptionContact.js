import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './AdoptionContact.css'

const AdoptionContact = () => {
	const { animalName } = useParams()

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		date: '',
		time: '',
		visitType: '',
		message: '',
		consent: false,
	})

	const [submitted, setSubmitted] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const handleChange = e => {
		const { name, value, type, checked } = e.target
		setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const visitTypeLabels = {
			firstVisit: 'Pierwsza wizyta',
			meetingAnimal: 'Zapoznanie ze zwierzakiem',
			adoptionAgreement: 'Umowa adopcyjna',
			other: 'Inne',
		}

		try {
			const response = await fetch('http://localhost:5000/api/contact/send', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...formData,
					visitType: visitTypeLabels[formData.visitType] || formData.visitType,
					animalName: animalName,
				}),
			})

			if (response.ok) {
				setSubmitted(true)
			} else {
				alert('Błąd serwera. Spróbuj później.')
			}
		} catch (error) {
			alert('Błąd połączenia.')
		}
	}

	return (
		<section
			className='adoption-container'
			style={{
				backgroundImage: 'url(/img/contact.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				position: 'relative',
				overflow: 'hidden',
			}}>
			<div className='adoption-bg'></div>

			<div className='adoption-header'>
				<h1>Adopcja: {animalName}</h1>
				<p>Zapoznaj się z procesem adopcji i umów wizytę w schronisku</p>
			</div>

			<div className='adoption-content'>
				{}
				<div className='adoption-info'>
					<h2>Jak wygląda adopcja?</h2>
					<ul>
						<li>Umówienie wizyty – telefon lub formularz online</li>
						<li>Rozmowa telefoniczna z opiekunem zwierzęcia</li>
						<li>Wizyta w schronisku – zapoznanie ze zwierzakiem</li>
						<li>Umowa adopcyjna</li>
						<li>Wizyty kontrolne po adopcji</li>
					</ul>
				</div>

				{}
				<div className='adoption-form'>
					<h2>Formularz adopcyjny</h2>

					{submitted ? (
						<div className='form-success'>
							<p>Dziękujemy! Twoje zgłoszenie zostało wysłane 🐾</p>
						</div>
					) : (
						<form onSubmit={handleSubmit}>
							<input
								type='text'
								name='name'
								placeholder='Twoje imię i nazwisko'
								value={formData.name}
								onChange={handleChange}
								required
							/>
							<input
								type='email'
								name='email'
								placeholder='Twój email'
								value={formData.email}
								onChange={handleChange}
								required
							/>
							<input
								type='tel'
								name='phone'
								placeholder='Telefon (opcjonalnie)'
								value={formData.phone}
								onChange={handleChange}
							/>

							<label>Wybierz dzień wizyty:</label>
							<input
								type='date'
								name='date'
								value={formData.date}
								onChange={handleChange}
								required
								min={new Date().toISOString().split('T')[0]}
							/>

							<label>Wybierz godzinę (10:00 - 18:00):</label>
							<input
								type='time'
								name='time'
								value={formData.time}
								onChange={handleChange}
								required
								min='10:00'
								max='18:00'
							/>

							<label>Typ wizyty:</label>
							<select name='visitType' value={formData.visitType} onChange={handleChange} required>
								<option value=''>-- wybierz --</option>
								<option value='firstVisit'>Pierwsza wizyta</option>
								<option value='meetingAnimal'>Zapoznanie ze zwierzakiem</option>
								<option value='adoptionAgreement'>Umowa adopcyjna</option>
								<option value='other'>Inne</option>
							</select>

							<textarea
								name='message'
								placeholder='Dodatkowe informacje / uwagi'
								value={formData.message}
								onChange={handleChange}
								rows='4'></textarea>

							<label className='consent-label'>
								<input type='checkbox' name='consent' checked={formData.consent} onChange={handleChange} required />
								Wyrażam zgodę na przetwarzanie moich danych osobowych (RODO)
							</label>

							<button type='submit'>Wyślij zgłoszenie</button>
						</form>
					)}
				</div>
			</div>
		</section>
	)
}

export default AdoptionContact

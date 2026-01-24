import React, { useState, useEffect } from 'react'
import './TimeWithAnimals.css'

const TimeWithAnimals = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		activity: '',
		date: '',
		hour: '',
		message: '',
	})

	const [submitted, setSubmitted] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const activityLabels = {
			spacer: 'Spacer z psem',
			zabawa: 'Zabawa z kotem',
			sprzatanie: 'Sprzątanie boksów',
			inne: 'Inne',
		}

		try {
			const response = await fetch('http://localhost:5000/api/contact/time-with-animals', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					activity: activityLabels[formData.activity] || formData.activity,
				}),
			})

			if (response.ok) {
				setSubmitted(true)
				setFormData({
					name: '',
					email: '',
					phone: '',
					activity: '',
					date: '',
					hour: '',
					message: '',
				})
			} else {
				alert('Wystąpił błąd podczas wysyłania zgłoszenia.')
			}
		} catch (error) {
			console.error('Błąd sieci:', error)
			alert('Błąd połączenia z serwerem.')
		}
	}

	const generateHours = () => {
		const hours = []
		for (let h = 10; h <= 16; h++) {
			hours.push(`${h}:00`)
			if (h !== 18) hours.push(`${h}:30`)
		}
		return hours
	}

	return (
		<section
			className='time-container'
			style={{
				backgroundImage: 'url(/img/time-with-dog.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				position: 'relative',
				overflow: 'hidden',
			}}>
			<div className='time-bg'></div>

			<div className='time-header'>
				<h1>Spędź czas ze zwierzakiem</h1>
				<p>Pomóż nam i spędź cudowne chwile z naszymi podopiecznymi </p>
			</div>

			<div className='time-content'>
				<div className='time-info'>
					<h2>Jak możesz pomóc?</h2>
					<p>Nie musisz być wolontariuszem, aby pomóc naszym zwierzakom! Możesz:</p>
					<ul>
						<li>🐶 Wyprowadzić psa na spacer</li>
						<li>🐱 Pobawić się z kotem</li>
						<li>🧹 Pomóc w sprzątaniu boksów</li>
						<li>💬 Spędzić z nimi trochę czasu i dać im uwagę</li>
					</ul>

					<p>
						Zadzwoń do nas: <strong>+48 123 456 789</strong> lub wypełnij formularz, a odezwiemy się do Ciebie!
					</p>
				</div>

				<div className='time-form'>
					<h2>Zgłoś chęć udziału</h2>

					{submitted ? (
						<div className='form-success'>
							<p>Dziękujemy! Skontaktujemy się z Tobą wkrótce 🐾</p>
						</div>
					) : (
						<form onSubmit={handleSubmit}>
							<label htmlFor='name'>Imię i nazwisko:</label>
							<input
								type='text'
								id='name'
								name='name'
								placeholder='Wpisz swoje imię i nazwisko'
								value={formData.name}
								onChange={handleChange}
								required
							/>

							<label htmlFor='email'>Adres e-mail:</label>
							<input
								type='email'
								id='email'
								name='email'
								placeholder='Twój e-mail'
								value={formData.email}
								onChange={handleChange}
								required
							/>

							<label htmlFor='phone'>Telefon (opcjonalnie):</label>
							<input
								type='tel'
								id='phone'
								name='phone'
								placeholder='Numer telefonu'
								value={formData.phone}
								onChange={handleChange}
							/>

							<label htmlFor='activity'>Wybierz aktywność:</label>
							<select id='activity' name='activity' value={formData.activity} onChange={handleChange} required>
								<option value=''>-- wybierz --</option>
								<option value='spacer'>Spacer z psem</option>
								<option value='zabawa'>Zabawa z kotem</option>
								<option value='sprzatanie'>Sprzątanie boksów</option>
								<option value='inne'>Inne</option>
							</select>

							<label htmlFor='date'>Wybierz dzień wizyty:</label>
							<input
								type='date'
								id='date'
								name='date'
								value={formData.date}
								onChange={handleChange}
								required
								min={new Date().toISOString().split('T')[0]}
							/>

							<label htmlFor='hour'>Wybierz godzinę:</label>
							<select id='hour' name='hour' value={formData.hour} onChange={handleChange} required>
								<option value=''>-- wybierz godzinę --</option>
								{generateHours().map((h, i) => (
									<option key={i} value={h}>
										{h}
									</option>
								))}
							</select>

							<label htmlFor='message'>Dodatkowe uwagi:</label>
							<textarea
								id='message'
								name='message'
								rows='5'
								placeholder='Np. preferowany pies, doświadczenie ze zwierzętami...'
								value={formData.message}
								onChange={handleChange}></textarea>

							<button type='submit'>Wyślij zgłoszenie</button>
						</form>
					)}
				</div>
			</div>
		</section>
	)
}

export default TimeWithAnimals

import React, { useState, useEffect } from 'react'
import '../components/Contact.css'

const Contact = () => {
	const [formData, setFormData] = useState({
		email: '',
		issue: '',
		subject: '',
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

		try {
			const response = await fetch('http://localhost:5000/api/contact/send-message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				console.log('Wysłano wiadomość:', formData)
				setSubmitted(true)
				setFormData({ email: '', issue: '', subject: '', message: '' })
			} else {
				console.error('Błąd przy wysyłaniu wiadomości')
			}
		} catch (error) {
			console.error('Błąd:', error)
		}
	}

	return (
		<section
			className='contact-container'
			style={{
				backgroundImage: 'url(/img/contact.jpg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				position: 'relative',
				overflow: 'hidden',
			}}>
			<div className='contact-bg'></div>

			<div className='contact-header'>
				<h1>Kontakt</h1>
				<p>Skontaktuj się z nami — chętnie pomożemy!</p>
			</div>

			<div className='contact-content'>
				<div className='contact-info'>
					<h2>Schronisko „Adoptuj przyjaciela”</h2>
					<p>
						<strong>Adres:</strong> ul. Leśna 12, 00-000 Warszawa
					</p>
					<p>
						<strong>Telefon:</strong> +48 123 456 789
					</p>
					<p>
						<strong>Email:</strong> kontaktadoptujprzyjaciela@gmail.com
					</p>
					<p>
						<strong>Godziny otwarcia:</strong>
						<br />
						Poniedziałek: 10:00 – 18:00
						<br />
						Wtorek: 10:00 – 18:00
						<br />
						Środa: 10:00 – 18:00
						<br />
						Czwartek: 10:00 – 18:00
						<br />
						Piątek: 10:00 – 18:00
						<br />
						Sobota: 10:00 – 18:00
						<br />
						Niedziela: 10:00 - 18:00
					</p>
				</div>

				<div className='contact-form'>
					<h2>Formularz kontaktowy</h2>

					{submitted ? (
						<div className='form-success'>
							<p>Dziękujemy! Twoja wiadomość została wysłana 🐾</p>
						</div>
					) : (
						<form onSubmit={handleSubmit}>
							<label htmlFor='email'>Twój email:</label>
							<input
								type='email'
								id='email'
								name='email'
								placeholder='Wpisz swój email'
								value={formData.email}
								onChange={handleChange}
								required
							/>

							<label htmlFor='issue'>Wybierz sprawę:</label>
							<select name='issue' id='issue' value={formData.issue} onChange={handleChange} required>
								<option value=''>-- wybierz --</option>
								<option value='adopcja'>Adopcja zwierzaka</option>
								<option value='wolontariat'>Wolontariat</option>
								<option value='darowizna'>Darowizna lub wsparcie</option>
								<option value='inne'>Inna sprawa</option>
							</select>

							<label htmlFor='subject'>Temat:</label>
							<input
								type='text'
								id='subject'
								name='subject'
								placeholder='Wpisz temat wiadomości'
								value={formData.subject}
								onChange={handleChange}
								required
							/>

							<label htmlFor='message'>Treść wiadomości:</label>
							<textarea
								id='message'
								name='message'
								rows='5'
								placeholder='Opisz swoją sprawę...'
								value={formData.message}
								onChange={handleChange}
								required></textarea>

							<button type='submit'>Wyślij wiadomość</button>
						</form>
					)}
				</div>
			</div>
		</section>
	)
}

export default Contact

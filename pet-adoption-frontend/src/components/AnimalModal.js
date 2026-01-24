import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AnimalModal.css'

const formatAge = (years, months) => {
	let result = ''
	if (years > 0) result += `${years} ${years === 1 ? 'rok' : 'lata'} `
	if (months > 0) result += `${months} ${months === 1 ? 'miesiąc' : 'miesięcy'}`
	return result.trim()
}

const AnimalModal = ({ animal, onClose, showAdoptionButton = false }) => {
	const navigate = useNavigate()

	if (!animal) return null

	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-content' onClick={e => e.stopPropagation()}>
				<button className='modal-close' onClick={onClose}>
					×
				</button>
				<img src={animal.img} alt={animal.name} />
				<div className='modal-info'>
					<h3>{animal.name}</h3>
					{(animal.ageYears !== undefined || animal.ageMonths !== undefined) && (
						<p>
							<strong>Wiek:</strong> {formatAge(animal.ageYears || 0, animal.ageMonths || 0)}
						</p>
					)}
					{animal.size && (
						<p>
							<strong>Wielkość:</strong> {animal.size}
						</p>
					)}
					{animal.shelterTime && (
						<p>
							<strong>Czas w schronisku:</strong> {animal.shelterTime}
						</p>
					)}
					{animal.history && <p style={{ color: '#ae5224', fontWeight: 'normal' }}>{animal.history}</p>}
					{animal.goodWithAnimals && (
						<p>
							<strong>Może mieszkać z innymi zwierzętami:</strong> {animal.goodWithAnimals}
						</p>
					)}
					{animal.goodWithKids && (
						<p>
							<strong>Może mieszkać z dziećmi:</strong> {animal.goodWithKids}
						</p>
					)}

					{showAdoptionButton && (
						<button className='modal-adopt-btn' onClick={() => navigate(`/adoption-contact/${animal.name}`)}>
							Skontaktuj się w sprawie adopcji
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default AnimalModal

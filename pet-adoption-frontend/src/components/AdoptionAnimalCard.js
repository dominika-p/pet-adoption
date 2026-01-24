import React from 'react'
import './AdoptionAnimalCard.css'

const AdoptionAnimalCard = ({ name, gender, ageYears, ageMonths, size, img }) => {
	return (
		<div className='adoption-animal-card'>
			<img src={img} alt={name} />
			<h3>{name}</h3>
			<div className='adoption-animal-card__info'>
				{}
				<span>
					Wiek: {ageYears} lat, {ageMonths} msc
				</span>
				<span>Wielkość: {size}</span>
				<span>Płeć: {gender}</span>
			</div>
		</div>
	)
}

export default AdoptionAnimalCard

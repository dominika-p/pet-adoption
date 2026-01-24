import React from 'react'
import './HeroSection.css'
import { useNavigate } from 'react-router-dom'

const HeroSection = ({ img }) => {
	const navigate = useNavigate()

	const handleNavigate = () => {
		navigate('/adopcja')
	}

	return (
		<header className='hero-section'>
			<div className='page-wrapper hero-wrapper'>
				<div className='hero-text'>
					<h2>Adoptuj przyjaciela</h2>
					<p>
						Podaruj dom, miłość i nowe życie zwierzakowi, który czeka właśnie na Ciebie. Każdy pupil zasługuje na drugą
						szansę – być może to właśnie Ty możesz ją dać.
					</p>
					<button className='adopt-button' onClick={handleNavigate}>
						Zobacz zwierzaki do adopcji
					</button>
				</div>
				<img src={img} alt='Pies i kot' className='hero-img' />
			</div>
		</header>
	)
}

export default HeroSection

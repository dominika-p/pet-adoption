import React, { useState, useEffect } from 'react'
import './BlogSection.css'
import { useNavigate } from 'react-router-dom'

const BlogSection = () => {
	const [posts, setPosts] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('http://localhost:5000/api/blog')
				if (response.ok) {
					const data = await response.json()

					const sorted = data.sort((a, b) => b.id - a.id)
					setPosts(sorted)
				}
			} catch (error) {
				console.error('Błąd pobierania wpisów na blogu:', error)
			}
		}

		fetchPosts()
	}, [])

	const handleShowMorePosts = () => {
		navigate('/blog')
	}

	return (
		<section className='blog-section'>
			<h3>Ostatnie wpisy na blogu</h3>
			<div className='blog-list'>
				{}
				{posts.slice(0, 4).map(post => (
					<div key={post.id} className='blog-card'>
						<img src={post.img} alt={post.title} className='blog-img' />
						<div className='blog-content'>
							<h4>{post.title}</h4>
							{}
							<p>{post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}</p>
							<button
								className='read-more'
								style={{
									background: 'none',
									border: 'none',
									padding: 0,
									cursor: 'pointer',
									textDecoration: 'underline',
								}}
								onClick={() => navigate(`/blog/${post.id}`)}>
								Czytaj więcej
							</button>
						</div>
					</div>
				))}
			</div>

			{posts.length > 0 && (
				<button className='adopt-button' onClick={handleShowMorePosts}>
					Zobacz więcej wpisów
				</button>
			)}
		</section>
	)
}

export default BlogSection

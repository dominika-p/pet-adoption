import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './BlogPage.css'

const BlogPage = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		window.scrollTo(0, 0)
		fetchPosts()
	}, [])

	const fetchPosts = async () => {
		try {
			const response = await fetch('http://localhost:5000/api/blog')
			if (response.ok) {
				const data = await response.json()

				setPosts(data)
			}
		} catch (error) {
			console.error('Błąd pobierania postów:', error)
		} finally {
			setLoading(false)
		}
	}

	if (loading)
		return (
			<div className='blog-page-wrapper'>
				<p>Ładowanie wpisów...</p>
			</div>
		)

	return (
		<>
			<header
				className='blog-page-header'
				style={{
					backgroundImage: "url('/img/blog-page.jpg')",
				}}>
				<h1 className='blog-page-main-title'>Blog schroniska</h1>
			</header>

			<div className='blog-page-wrapper'>
				<h2 className='blog-page-title'>Najnowsze wpisy</h2>
				<div className='blog-list-page'>
					{posts.length > 0 ? (
						posts.map(post => (
							<div key={post.id} className='blog-card-page'>
								<img src={post.img} alt={post.title} className='blog-img-page' />
								<div className='blog-content-page'>
									<h4>{post.title}</h4>
									{}
									<p>{post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}</p>
									{}
									<Link to={`/blog/${post.id}`} className='blog-readmore'>
										Czytaj więcej &gt;
									</Link>
								</div>
							</div>
						))
					) : (
						<p>Obecnie nie ma żadnych wpisów na blogu.</p>
					)}
				</div>
			</div>
		</>
	)
}

export default BlogPage

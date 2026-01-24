import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './BlogArticle.css'

const BlogArticle = () => {
	const { id } = useParams()
	const postId = id ?? ''

	const [post, setPost] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await fetch(`http://localhost:5000/api/blog/${postId}`)
				if (response.ok) {
					const data = await response.json()
					setPost(data)
				} else {
					console.error('Artykuł nie został znaleziony w bazie')
				}
			} catch (error) {
				console.error('Błąd połączenia z API:', error)
			} finally {
				setLoading(false)
			}
		}

		window.scrollTo(0, 0)
		fetchPost()
	}, [postId])

	if (loading)
		return (
			<div className='blog-article-container'>
				<p>Ładowanie treści...</p>
			</div>
		)

	if (!post)
		return (
			<div className='blog-article-container'>
				<h2>Nie znaleziono artykułu</h2>
				<Link to='/blog' className='back-link'>
					Wróć do listy wpisów
				</Link>
			</div>
		)

	return (
		<article className='blog-article'>
			<header className='article-header' style={{ backgroundImage: `url(${post.img})` }}>
				<div className='article-header-content'>
					<h1>{post.title}</h1>
				</div>
			</header>

			<div className='article-body'>
				{post.content.split('\n').map((paragraph, index) => (
					<p key={index}>{paragraph}</p>
				))}

				<div className='article-footer'>
					<Link to='/blog' className='blog-readmore'>
						&lt; Wróć do bloga
					</Link>
				</div>
			</div>
		</article>
	)
}

export default BlogArticle

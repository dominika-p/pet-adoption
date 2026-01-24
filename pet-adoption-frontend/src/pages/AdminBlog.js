import { useState, useEffect } from 'react'
import './AdminBlog.css'

const AdminBlog = () => {
	const [posts, setPosts] = useState([])
	const [newPost, setNewPost] = useState({ title: '', content: '' })
	const [selectedFile, setSelectedFile] = useState(null)

	useEffect(() => {
		fetchPosts()
	}, [])

	const fetchPosts = async () => {
		try {
			const res = await fetch('http://localhost:5000/api/blog')
			const data = await res.json()
			setPosts(data.map(p => ({ ...p, isEditing: false })))
		} catch (err) {
			console.error('Błąd pobierania:', err)
		}
	}

	const addPost = async () => {
		if (!newPost.title || !selectedFile) {
			alert('Uzupełnij tytuł i wybierz zdjęcie')
			return
		}

		const formData = new FormData()
		formData.append('title', newPost.title)
		formData.append('content', newPost.content)
		formData.append('file', selectedFile)

		try {
			const res = await fetch('http://localhost:5000/api/blog', {
				method: 'POST',
				body: formData,
			})

			if (res.ok) {
				const savedPost = await res.json()
				setPosts([{ ...savedPost, isEditing: false }, ...posts])
				setNewPost({ title: '', content: '' })
				setSelectedFile(null)
				alert('Post dodany!')
			}
		} catch (err) {
			console.error('Błąd wysyłania:', err)
		}
	}

	const deletePost = async id => {
		if (!window.confirm('Usunąć post?')) return
		try {
			await fetch(`http://localhost:5000/api/blog/${id}`, { method: 'DELETE' })
			setPosts(posts.filter(p => p.id !== id))
		} catch (err) {
			console.error('Błąd usuwania:', err)
		}
	}

	const handleEditClick = async post => {
		if (post.isEditing) {
			try {
				const response = await fetch(`http://localhost:5000/api/blog/${post.id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						title: post.title,
						content: post.content,
					}),
				})

				if (response.ok) {
					console.log('Zaktualizowano pomyślnie')
				} else {
					alert('Błąd zapisu na serwerze')
					return
				}
			} catch (err) {
				console.error('Błąd edycji:', err)
				return
			}
		}

		setPosts(posts.map(p => (p.id === post.id ? { ...p, isEditing: !p.isEditing } : p)))
	}

	const handleChange = (id, field, value) => {
		setPosts(posts.map(p => (p.id === id ? { ...p, [field]: value } : p)))
	}

	return (
		<div className='admin-section'>
			<h2>Dodaj nowy post</h2>
			<div className='blog-form'>
				<input
					type='text'
					placeholder='Tytuł posta'
					value={newPost.title}
					onChange={e => setNewPost({ ...newPost, title: e.target.value })}
				/>
				<textarea
					placeholder='Treść posta'
					value={newPost.content}
					onChange={e => setNewPost({ ...newPost, content: e.target.value })}
				/>
				<input type='file' accept='image/*' onChange={e => setSelectedFile(e.target.files[0])} />
				<button onClick={addPost}>Dodaj post</button>
			</div>

			<hr />
			<h2>Lista postów</h2>
			<div className='blog-list'>
				{posts.map(post => (
					<div key={post.id} className='blog-item'>
						<div className='blog-img-preview'>
							{post.img ? <img src={post.img} alt='Post' /> : <span>Brak foto</span>}
						</div>

						<div className='blog-content'>
							{post.isEditing ? (
								<>
									<input value={post.title} onChange={e => handleChange(post.id, 'title', e.target.value)} />
									<textarea value={post.content} onChange={e => handleChange(post.id, 'content', e.target.value)} />
								</>
							) : (
								<>
									<h4>{post.title}</h4>
									<p>{post.content}</p>
								</>
							)}

							<div className='blog-buttons'>
								<button onClick={() => handleEditClick(post)}>{post.isEditing ? 'Zapisz' : 'Edytuj'}</button>
								{!post.isEditing && <button onClick={() => deletePost(post.id)}>Usuń</button>}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AdminBlog

import React, { useState } from 'react'

const PostForm = () => {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		console.log('Dodaj post:', { title, content })
		setTitle('')
		setContent('')
	}

	return (
		<form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
			<input
				type='text'
				placeholder='Tytuł'
				value={title}
				onChange={e => setTitle(e.target.value)}
				style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
			/>
			<textarea
				placeholder='Treść'
				value={content}
				onChange={e => setContent(e.target.value)}
				style={{ width: '100%', padding: '10px', height: '100px', marginBottom: '10px' }}
			/>
			<button type='submit' style={{ padding: '10px 20px', cursor: 'pointer' }}>
				Dodaj post
			</button>
		</form>
	)
}

export default PostForm

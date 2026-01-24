import { useEffect, useState } from 'react'
import './AdminVolunteers.css'

const AdminVolunteers = () => {
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		fetch('http://localhost:5000/api/tasks/pending')
			.then(res => res.json())
			.then(data => setTasks(data))
			.catch(err => console.error(err))
	}, [])

	const handleAcceptTask = taskId => {
		fetch(`http://localhost:5000/api/tasks/approve/${taskId}`, {
			method: 'PUT',
		})
			.then(res => res.json())
			.then(updated => {
				setTasks(prev => prev.filter(t => t.id !== taskId))
			})
			.catch(err => console.error(err))
	}

	const handleRejectTask = taskId => {
		const reason = prompt('Podaj powód odrzucenia')
		if (!reason) return

		fetch(`http://localhost:5000/api/tasks/cancel/${taskId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reason }),
		})
			.then(res => res.json())
			.then(() => {
				setTasks(prev => prev.filter(t => t.id !== taskId))
			})
			.catch(err => console.error(err))
	}

	return (
		<div className='admin-section'>
			<h2>Wolontariusze – zadania oczekujące</h2>

			{tasks.length === 0 && <p>Brak zadań</p>}

			{tasks.map(task => (
				<div key={task.id} className='task-item'>
					<p>
						<strong>Wolontariusz:</strong> {task.volunteerName || 'Nieznany wolontariusz'}
					</p>
					<p>
						<strong>Telefon:</strong> {task.volunteerPhone || '-'}
					</p>
					<p>
						<strong>Typ:</strong> {task.type}
					</p>
					<p>
						<strong>Data:</strong> {task.date}
					</p>
					<p>
						<strong>Godzina:</strong> {task.time}
					</p>

					<div className='task-buttons'>
						<button onClick={() => handleAcceptTask(task.id)}>Akceptuj</button>
						<button onClick={() => handleRejectTask(task.id)}>Odrzuć</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default AdminVolunteers

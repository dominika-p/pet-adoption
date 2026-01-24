import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './AdminCalendar.css'

console.log('ADMIN CALENDAR FILE LOADED')

const AdminCalendar = () => {
	const [tasks, setTasks] = useState([])
	const [selectedDate, setSelectedDate] = useState(() => {
		const d = new Date()
		d.setHours(12, 0, 0, 0)
		return d
	})

	useEffect(() => {
		fetch('http://localhost:5000/api/admin/tasks/approved')
			.then(res => res.json())
			.then(data => {
				console.log('DANE Z API:', data)
				if (Array.isArray(data)) {
					setTasks(data)
				} else {
					setTasks([])
				}
			})
			.catch(err => console.error('Błąd pobierania zadań:', err))
	}, [])

	const formatDateToString = date => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	const tileContent = ({ date, view }) => {
		if (view !== 'month') return null

		const dStr = formatDateToString(date)

		const hasTask = tasks.some(t => t.status === 'APPROVED' && t.date === dStr)

		return hasTask ? <div className='dot' /> : null
	}

	const selectedDateStr = formatDateToString(selectedDate)

	const tasksForDay = tasks.filter(t => t.status === 'APPROVED' && t.date === selectedDateStr)

	const handleDeleteTask = taskId => {
		const reason = prompt('Podaj powód anulowania zadania')
		if (!reason) return

		fetch(`http://localhost:5000/api/tasks/cancel/${taskId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ reason }),
		})
			.then(res => res.json())
			.then(updated => {
				setTasks(prev => prev.map(t => (t.id === taskId ? updated : t)))
			})
			.catch(err => console.error(err))
	}

	return (
		<div className='admin-section calendar-container'>
			<h2>Kalendarz wolontariatu</h2>

			<div className='calendar-tasks-wrapper'>
				{}
				<Calendar
					onClickDay={date => {
						console.log('Kliknięto dzień:', date)
						setSelectedDate(date)
					}}
					tileContent={tileContent}
					value={selectedDate}
				/>

				{}
				<div className='calendar-task-list'>
					{tasksForDay.length === 0 ? (
						<p>Brak zadań</p>
					) : (
						tasksForDay.map(t => {
							const volunteerDisplay = t.volunteerName || 'Nieznany wolontariusz'
							return (
								<div key={t.id} className='calendar-task'>
									<strong>{t.type}</strong>
									<div>{volunteerDisplay}</div>
									<div>🕒 {t.time.substring(0, 5)}</div>
									<div>📞 {t.volunteerPhone || '-'}</div>
									<button onClick={() => handleDeleteTask(t.id)}>Usuń</button>
								</div>
							)
						})
					)}
				</div>
			</div>
		</div>
	)
}

window.addEventListener('click', () => {
	console.log('GLOBAL CLICK')
})

export default AdminCalendar

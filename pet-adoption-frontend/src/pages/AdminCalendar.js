import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AdminCalendar.css';

const AdminCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Filtruj zadania zatwierdzone dla wybranego dnia
  const tasksForDay = tasks.filter(t => t.date === selectedDate);

  // Dodaje kropkę pod dniem z zadaniem
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
      const dayTasks = tasks.filter(t => t.status === 'APPROVED' && t.date === formattedDate);
      if (dayTasks.length > 0) return <div className="dot"></div>;
    }
    return null;
  };

  // Przykładowe zadania – w realnym projekcie pobierane z backendu
  useEffect(() => {
    const sampleTasks = [
      {
        id: 1,
        type: 'Spacer z psem',
        volunteer: { firstName: 'Jan', lastName: 'Kowalski', phone: '123456789' },
        date: selectedDate,
        time: '10:00',
        status: 'APPROVED',
        cancellationReason: '',
      },
      {
        id: 2,
        type: 'Karmienie kotów',
        volunteer: { firstName: 'Anna', lastName: 'Nowak', phone: '987654321' },
        date: selectedDate,
        time: '12:00',
        status: 'APPROVED',
        cancellationReason: '',
      },
    ];
    setTasks(sampleTasks);
  }, [selectedDate]);

  const handleDeleteTask = (taskId) => {
    const reason = prompt('Podaj powód anulowania zadania:');
    if (!reason) return alert('Anulowanie wymaga podania powodu!');

    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? { ...t, status: 'CANCELLED', cancellationReason: reason } : t
      )
    );
    alert('Zadanie zostało anulowane i użytkownik zostanie o tym poinformowany.');
  };

  return (
    <div className="admin-section calendar-container">
      <h2>Kalendarz wolontariatu</h2>
      <div className="calendar-tasks-wrapper">
        <Calendar
          onChange={(date) =>
            setSelectedDate(
              `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`
            )
          }
          value={new Date(selectedDate)}
          locale="pl-PL"
          tileContent={tileContent}
          className="custom-calendar"
        />

        <div className="calendar-task-list">
          {tasksForDay.length > 0 ? (
            tasksForDay.map(t => (
              <div key={t.id} className={`calendar-task ${t.status === 'CANCELLED' ? 'cancelled' : ''}`}>
                <strong>{t.type}</strong>
                <div>
                  {t.volunteer.firstName} {t.volunteer.lastName}
                </div>
                <div>📞 {t.volunteer.phone}</div>
                <div>🕒 {t.time}</div>
                {t.status === 'APPROVED' && (
                  <button onClick={() => handleDeleteTask(t.id)}>Usuń</button>
                )}
                {t.status === 'CANCELLED' && (
                  <p className="cancel-reason">Anulowano: {t.cancellationReason}</p>
                )}
              </div>
            ))
          ) : (
            <p>Brak zadań</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCalendar;



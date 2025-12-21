import { useState } from 'react';
import './AdminVolunteers.css';

const AdminVolunteers = () => {
  // Przykładowe zadania wolontariuszy
  const [tasks, setTasks] = useState([
    {
      id: 1,
      volunteer: 'Jan Kowalski',
      type: 'Spacer z psem',
      date: '2025-12-22',
      time: '10:00',
      status: 'PENDING',
    },
    {
      id: 2,
      volunteer: 'Anna Nowak',
      type: 'Karmienie kotów',
      date: '2025-12-22',
      time: '12:00',
      status: 'PENDING',
    },
  ]);

  // Akceptacja zadania
  const handleAcceptTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'APPROVED' } : t))
    );
  };

  // Odrzucenie zadania
  const handleRejectTask = (taskId) => {
    const reason = prompt('Podaj powód odrzucenia:') || 'Brak powodu';
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: 'CANCELLED', cancellationReason: reason } : t
      )
    );
  };

  const pendingTasks = tasks.filter((t) => t.status === 'PENDING');

  return (
    <div className="admin-section">
      <h2>Wolontariusze</h2>
      <div className="pending-tasks">
        <h3>Zadania oczekujące na akceptację</h3>
        {pendingTasks.length === 0 && <p>Brak zadań oczekujących</p>}

        {pendingTasks.map((task) => (
          <div key={task.id} className="task-item">
            <p>Wolontariusz: {task.volunteer}</p>
            <p>Typ zadania: {task.type}</p>
            <p>Data: {task.date}</p>
            <p>Godzina: {task.time}</p>
            <div className="task-buttons">
              <button onClick={() => handleAcceptTask(task.id)}>Akceptuj</button>
              <button onClick={() => handleRejectTask(task.id)}>Odrzuć</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVolunteers;

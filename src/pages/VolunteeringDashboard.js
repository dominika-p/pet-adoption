import React, { useState, useEffect, useCallback, useContext } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './VolunteeringDashboard.css';
import { UserContext } from '../context/UserContext';

const dniTygodnia = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];
const miesiace = [
  'Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'
];

const taskTypes = ['Spacer z psem', 'Sprzątanie boksów', 'Opieka nad zwierzętami'];
const hours = Array.from({ length: 8 }, (_, i) => `${10 + i}:00`);

const VolunteeringDashboard = () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ type: '', date: todayStr, time: '10:00', note: '' });
  const [profile, setProfile] = useState(null);

  const savedUser = JSON.parse(localStorage.getItem("user") || '{}');
  const { user } = useContext(UserContext);

  // --- Pobieranie profilu użytkownika ---
  useEffect(() => {
    if (!savedUser?.id) return;
    const loadProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/volunteers/${savedUser.id}`);
        setProfile(res.data);
      } catch (err) {
        console.error("Błąd pobierania profilu:", err);
      }
    };
    loadProfile();
  }, [savedUser]);

  // --- Pobieranie zadań ---
  const fetchTasks = useCallback(async (date) => {
    if (!savedUser?.id) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/by-volunteer/${savedUser.id}?date=${date}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Błąd pobierania zadań:", err);
    }
  }, [savedUser]);

  useEffect(() => {
    fetchTasks(selectedDate);
  }, [selectedDate, fetchTasks]);

  // --- Dodawanie zadania ---
  const addTask = async () => {
    if (!newTask.type || !newTask.date || !newTask.time) return;
    if (!user?.id) return alert("Nie jesteś zalogowany lub brak id użytkownika");

    const taskToSave = { 
      volunteerId: user.id,
      type: newTask.type,
      date: newTask.date,
      time: newTask.time + ":00",
      note: newTask.note,
      status: "PENDING"
    };

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", taskToSave);
      setTasks(prev => [...prev, res.data]);
      setNewTask({ type: '', date: newTask.date, time: '10:00', note: '' });
    } catch (err) {
      console.error("Błąd dodawania zadania:", err);
      alert("Nie udało się dodać zadania");
    }
  };

  // --- Anulowanie zadania ---
  const cancelTask = async (taskId) => {
    const reason = prompt('Podaj powód rezygnacji:');
    if (!reason) return;
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/cancel/${taskId}`, { reason });
      setTasks(prev => prev.map(t => t.id === taskId ? res.data : t));
    } catch (err) {
      console.error("Błąd anulowania zadania:", err);
      alert("Nie udało się anulować zadania");
    }
  };

  // --- Filtrowanie zadań po dacie ---
 const tasksForDay = tasks.filter(t => {
  console.log("Task:", t.date, t.status); // <--- sprawdź co przychodzi
  const taskDate = t.date.split('T')[0];
  return (
    (t.status === "PENDING" || t.status === "APPROVED" || t.status === "CANCELLED") &&
    taskDate === selectedDate
  );
});

  const formatDate = dateStr => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return `${dniTygodnia[dateObj.getDay()]}, ${day} ${miesiace[month - 1]} ${year}`;
  };

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const dStr = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
    const hasTask = tasks.some(t => t.date.startsWith(dStr));
    return hasTask ? <div className='dot'></div> : null;
  };

  return (
    <div className="dashboard-page" style={{
      minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      padding: '30px 20px', fontFamily: "'Poppins', sans-serif", color: '#4a3f35',
      background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('/img/paneltlo2.jpg') center/cover no-repeat`,
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
    }}>
      <div className="dashboard-container">
        <h2>Panel wolontariusza</h2>

        {profile && (
          <div className="profile-info">
            <p><strong>Imię:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        )}

        <div className='calendar-box'>
          <Calendar
            onChange={date => {
              const d = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
              setSelectedDate(d);
              setNewTask(prev => ({ ...prev, date: d }));
            }}
            value={new Date(selectedDate)}
            locale='pl-PL'
            tileContent={tileContent}
          />
        </div>

        <div className='task-box'>
          <div className='task-header'>Lista zadań</div>
          <div className='task-date'>{formatDate(selectedDate)}</div>
          {tasksForDay.length > 0 ? tasksForDay.map(task => (
  <div key={task.id} className={`task-item ${task.status.toLowerCase()}`}>
    <div className='task-main-row'>
      <div className='task-info'>
        <strong>{task.type}</strong> — {task.time.substring(0,5)}
        {task.status === 'PENDING' && <span className='pending-label'> (Oczekujące)</span>}
        {task.status === 'APPROVED' && <span className='approved-label'> (Zatwierdzone ✔)</span>}
        {task.status === 'CANCELLED' && <span className='cancelled-label'> (Anulowane)</span>}
      </div>
      {task.status !== 'CANCELLED' && (
        <button onClick={() => cancelTask(task.id)} className='cancel-btn'>Usuń</button>
      )}
    </div>
    {task.note && <div className='task-note'><em>Notatka:</em> {task.note}</div>}
    {task.cancellationReason && <div className='task-note'><em>Powód anulowania:</em> {task.cancellationReason}</div>}
  </div>
)) : <div>Brak zadań na ten dzień</div>}
        </div>

        <div className='add-task-box'>
          <div className='add-task-header'>Dodaj aktywność</div>
          <div className='add-task-row'>
            <select value={newTask.type} onChange={e => setNewTask(prev => ({ ...prev, type: e.target.value }))}>
              <option value=''>-- wybierz aktywność --</option>
              {taskTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input type='date' value={newTask.date} onChange={e => setNewTask(prev => ({ ...prev, date: e.target.value }))} />
            <select value={newTask.time} onChange={e => setNewTask(prev => ({ ...prev, time: e.target.value }))}>
              {hours.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            <button className='add-btn' onClick={addTask}>Dodaj</button>
          </div>
          <textarea className='add-task-note' placeholder='Dodaj notatkę...' value={newTask.note} onChange={e => setNewTask(prev => ({ ...prev, note: e.target.value }))} />
        </div>
      </div>
    </div>
  );
};

export default VolunteeringDashboard;

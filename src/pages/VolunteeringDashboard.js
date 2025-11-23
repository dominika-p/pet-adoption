import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./VolunteeringDashboard.css";

const dniTygodnia = ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"];
const miesiace = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
];

const VolunteeringDashboard = () => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    type: "",
    date: todayStr,
    time: "10:00",
    note: ""
  });

  const taskTypes = ["Spacer z psem", "Sprzątanie boksów", "Opieka nad zwierzętami"];
  const hours = Array.from({ length: 8 }, (_, i) => `${10 + i}:00`);

  const addTask = () => {
    if (!newTask.type || !newTask.date || !newTask.time) return;

    setTasks([...tasks, { ...newTask, status: "pending" }]);
    setNewTask({ type: "", date: selectedDate, time: "10:00", note: "" });
  };

  const cancelTask = (index) => {
    const reason = prompt("Podaj powód rezygnacji:");
    if (!reason) return;

    const updated = [...tasks];
    updated[index].status = "cancelled";
    updated[index].reason = reason;
    setTasks(updated);
  };

  const tasksForDay = tasks.filter((t) => t.date === selectedDate);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return `${dniTygodnia[dateObj.getDay()]}, ${day} ${miesiace[month - 1]} ${year}`;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dStr = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
      const hasTask = tasks.some(t => t.date === dStr);
      return hasTask ? <div className="dot"></div> : null;
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Panel wolontariusza</h2>

      {/* Kalendarz */}
      <div className="calendar-box">
        <Calendar
          onChange={(date) => {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const d = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
            setSelectedDate(d);
            setNewTask({ ...newTask, date: d });
          }}
          value={new Date(selectedDate)}
          locale="pl-PL"
          tileContent={tileContent}
        />
      </div>

      {/* Lista zadań */}
      <div className="task-box">
        <div className="task-header">Lista zadań</div>
        <div className="task-date">{formatDate(selectedDate)}</div>
        {tasksForDay.length > 0 ? (
          tasksForDay.map((task, index) => (
            <div key={index} className={`task-item ${task.status}`}>
              <div className="task-main-row">
                <div className="task-info">{task.type} — {task.time}</div>
                <div className="task-status">
                  {task.status === "pending" && "Oczekuje na zatwierdzenie"}
                  {task.status === "approved" && "Zatwierdzone ✔"}
                  {task.status === "cancelled" && `Anulowane — ${task.reason}`}
                </div>
                {task.status !== "cancelled" && (
                  <button
                    onClick={() => cancelTask(tasks.indexOf(task))}
                    className="cancel-btn"
                  >
                    Usuń
                  </button>
                )}
              </div>
              {task.note && <div className="task-note">{task.note}</div>}
            </div>
          ))
        ) : (
          <div>Brak zadań na ten dzień</div>
        )}
      </div>

      {/* Dodawanie zadania */}
      <div className="add-task-box">
        <div className="add-task-header">Dodaj aktywność</div>
        <div className="add-task-row">
          <select
            value={newTask.type}
            onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
          >
            <option value="">-- wybierz aktywność --</option>
            {taskTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <input
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          />

          <select
            value={newTask.time}
            onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
          >
            {hours.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>

          <button className="add-btn" onClick={addTask}>Dodaj</button>
        </div>

        <textarea
          className="add-task-note"
          placeholder="Dodaj notatkę..."
          value={newTask.note}
          onChange={(e) => setNewTask({ ...newTask, note: e.target.value })}
        />
      </div>
    </div>
  );
};

export default VolunteeringDashboard;



















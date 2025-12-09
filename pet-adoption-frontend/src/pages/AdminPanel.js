import React, { useState, useContext, useEffect } from "react";
import animalsData from "../data/animalsData";
import postsData from "../data/postsData";
import { AuthContext } from "../context/AuthContext";
import "./AdminPanel.css";
import axios from "axios";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);

  // --- Hooki zawsze na górze ---
  const [activeTab, setActiveTab] = useState("zwierzaki");
  const [animals, setAnimals] = useState(
    animalsData.map((a, index) => ({ ...a, id: index + 1 }))
  );
  const [posts, setPosts] = useState(postsData);

  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "Pies",
    gender: "On",
    ageYears: 0,
    ageMonths: 0,
    size: "Średni",
    breed: "",
    history: "",
    goodWithAnimals: "Tak",
    goodWithKids: "Tak",
    img: "",
  });

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    img: "",
  });

  const [tasks, setTasks] = useState([]);

  // --- Pobieranie tasków z backendu ---
  useEffect(() => {
    if (!user) return; // nie pobieramy jeśli niezalogowany

    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Błąd pobierania zadań:", error);
      }
    };

    fetchTasks();
  }, [user]);

  const handleAcceptTask = async (taskId) => {
  try {
    await axios.post(`http://localhost:5000/api/admin/tasks/${taskId}/approve`);

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "APPROVED" } : t))
    );
  } catch (error) {
    console.error("Błąd akceptacji zadania:", error);
  }
};

  const handleRejectTask = async (taskId) => {
  try {
    const reason = prompt("Podaj powód odrzucenia:") || "Brak powodu";

    await axios.post(
      `http://localhost:5000/api/admin/tasks/${taskId}/reject`,
      reason,
      {
        headers: { "Content-Type": "text/plain" }
      }
    );

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: "CANCELLED", cancellationReason: reason } : t))
    );
  } catch (error) {
    console.error("Błąd odrzucenia zadania:", error);
  }
};


  // --- Zwierzaki ---
  const addAnimal = () => {
    if (!newAnimal.name || !newAnimal.img) return;

    const totalMonths = newAnimal.ageYears * 12 + newAnimal.ageMonths;
    let ageCategory = "Młody";
    if (totalMonths >= 84) ageCategory = "Senior";
    else if (totalMonths >= 12) ageCategory = "Dorosły";

    setAnimals([{ ...newAnimal, id: Date.now(), age: ageCategory }, ...animals]);

    setNewAnimal({
      name: "",
      species: "Pies",
      gender: "On",
      ageYears: 0,
      ageMonths: 0,
      size: "Średni",
      breed: "",
      history: "",
      goodWithAnimals: "Tak",
      goodWithKids: "Tak",
      img: "",
    });
  };

  const deleteAnimal = (id) => setAnimals(animals.filter((a) => a.id !== id));

  // --- Blog ---
  const addPost = () => {
    if (!newPost.title || !newPost.img) return;
    setPosts([{ ...newPost, id: Date.now() }, ...posts]);
    setNewPost({ title: "", content: "", img: "" });
  };

  const deletePost = (id) => setPosts(posts.filter((p) => p.id !== id));

  return (
    <div
      className="admin-page"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('/img/wolontariat2.jpg') center/cover no-repeat`,
      }}
    >
      <div className="admin-panel-container">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <h2>Panel Administratora</h2>
          <button
            className={activeTab === "zwierzaki" ? "active" : ""}
            onClick={() => setActiveTab("zwierzaki")}
          >
            Zwierzaki
          </button>
          <button
            className={activeTab === "wiadomosci" ? "active" : ""}
            onClick={() => setActiveTab("wiadomosci")}
          >
            Wiadomości
          </button>
          <button
            className={activeTab === "wolontariusze" ? "active" : ""}
            onClick={() => setActiveTab("wolontariusze")}
          >
            Wolontariusze
          </button>
          <button
            className={activeTab === "blog" ? "active" : ""}
            onClick={() => setActiveTab("blog")}
          >
            Blog
          </button>
        </div>

        {/* Panel główny */}
        <div className="admin-main">
          {/* Zwierzaki */}
          {activeTab === "zwierzaki" && (
            <div className="admin-section">
              <h2>Dodaj nowego zwierzaka</h2>
              <div className="animal-form">
                <input
                  type="text"
                  placeholder="Imię zwierzaka"
                  value={newAnimal.name}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, name: e.target.value })
                  }
                />
                <select
                  value={newAnimal.species}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, species: e.target.value })
                  }
                >
                  <option value="Pies">Pies</option>
                  <option value="Kot">Kot</option>
                </select>
                <select
                  value={newAnimal.gender}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, gender: e.target.value })
                  }
                >
                  <option value="On">On</option>
                  <option value="Ona">Ona</option>
                </select>
                <div className="age-inputs">
                  <input
                    type="number"
                    min="0"
                    placeholder="Lata"
                    value={newAnimal.ageYears}
                    onChange={(e) =>
                      setNewAnimal({
                        ...newAnimal,
                        ageYears: parseInt(e.target.value),
                      })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    max="11"
                    placeholder="Miesiące"
                    value={newAnimal.ageMonths}
                    onChange={(e) =>
                      setNewAnimal({
                        ...newAnimal,
                        ageMonths: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                {newAnimal.species === "Pies" && (
                  <select
                    value={newAnimal.size}
                    onChange={(e) =>
                      setNewAnimal({ ...newAnimal, size: e.target.value })
                    }
                  >
                    <option value="Mały">Mały</option>
                    <option value="Średni">Średni</option>
                    <option value="Duży">Duży</option>
                  </select>
                )}
                <input
                  type="text"
                  placeholder="Rasa"
                  value={newAnimal.breed || ""}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, breed: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Opis"
                  value={newAnimal.history}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, history: e.target.value })
                  }
                />
                <select
                  value={newAnimal.goodWithAnimals}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, goodWithAnimals: e.target.value })
                  }
                >
                  <option value="Tak">Nadaje się z innymi zwierzętami</option>
                  <option value="Nie">Nie nadaje się z innymi zwierzętami</option>
                </select>
                <select
                  value={newAnimal.goodWithKids}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, goodWithKids: e.target.value })
                  }
                >
                  <option value="Tak">Nadaje się z dziećmi</option>
                  <option value="Nie">Nie nadaje się z dziećmi</option>
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewAnimal({
                      ...newAnimal,
                      img: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
                <button onClick={addAnimal}>Dodaj zwierzaka</button>
              </div>

              <h2>Lista zwierzaków</h2>
              <div className="animal-list">
                {animals.map((animal) => (
                  <div key={animal.id} className="animal-item">
                    <img src={animal.img} alt={animal.name} />
                    <h4>
                      {animal.name} ({animal.species})
                    </h4>
                    <p>
                      {animal.age}, {animal.gender}{" "}
                      {animal.species === "Pies" && animal.size}
                    </p>
                    <p>{animal.history}</p>
                    <p>
                      Zwierzęta: {animal.goodWithAnimals}, Dzieci: {animal.goodWithKids}
                    </p>
                    <div className="animal-buttons">
                      <button onClick={() => deleteAnimal(animal.id)}>Usuń</button>
                      <button
                        onClick={() =>
                          alert(
                            "Opcja edycji - można dodać modal lub formularz inline"
                          )
                        }
                      >
                        Edytuj
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wiadomości */}
          {activeTab === "wiadomosci" && (
            <div className="admin-section">
              <h2>Wiadomości</h2>
              <p>Tu będą wyświetlane wiadomości od odwiedzających</p>
            </div>
          )}

          {/* Wolontariusze */}
          {activeTab === "wolontariusze" && (
  <div className="admin-section">
    <h2>Wolontariusze</h2>
    <div className="pending-tasks">
      <h3>Zadania oczekujące na akceptację</h3>
      {tasks.filter(t => t.status === "PENDING").map(task => (
  <div key={task.id} className="task-item">
    <p>Wolontariusz: {task.volunteer}</p>
    <p>Typ zadania: {task.type}</p>
    <p>Data: {task.date}</p>
    <p>Godzina: {task.time}</p>
    <button onClick={() => handleAcceptTask(task.id)}>Akceptuj</button>
    <button onClick={() => handleRejectTask(task.id)}>Odrzuć</button>
  </div>
))}
      {tasks.filter(t => t.status === "PENDING").length === 0 && (
        <p>Brak zadań oczekujących</p>
      )}
    </div>
  </div>
)}

          {/* Blog */}
          {activeTab === "blog" && (
            <div className="admin-section">
              <h2>Dodaj nowy post</h2>
              <div className="blog-form">
                <input
                  type="text"
                  placeholder="Tytuł posta"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="Treść posta"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      img: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
                <button onClick={addPost}>Dodaj post</button>
              </div>

              <h2>Lista postów</h2>
              <div className="blog-list">
                {posts.map((post) => (
                  <div key={post.id} className="blog-item">
                    <h4>{post.title}</h4>
                    <p>{post.content.substring(0, 100)}...</p>
                    <img src={post.img} alt={post.title} />
                    <div className="blog-buttons">
                      <button onClick={() => deletePost(post.id)}>Usuń</button>
                      <button
                        onClick={() =>
                          alert(
                            "Opcja edycji posta - można dodać modal lub inline form"
                          )
                        }
                      >
                        Edytuj
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

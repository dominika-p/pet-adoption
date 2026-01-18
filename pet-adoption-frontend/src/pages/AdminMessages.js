import { useState, useEffect } from 'react';
import './AdminMessages.css';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  
  useEffect(() => {
    fetch("http://localhost:5000/api/contact/all")
      .then(res => res.json())
      .then(data => {
        
        const messagesWithReply = data.map(msg => ({ ...msg, replyText: '' }));
        setMessages(messagesWithReply);
      })
      .catch(err => console.error("Błąd pobierania wiadomości:", err));
  }, []);

 
  const deleteMessage = (id) => {
    fetch(`http://localhost:5000/api/contact/${id}`, { method: 'DELETE' })
      .then(() => setMessages(prev => prev.filter(msg => msg.id !== id)))
      .catch(err => console.error("Błąd usuwania:", err));
  };


  // Wysyłanie odpowiedzi (PATCH + automatyczny mail)
  const sendReply = (id, replyText) => {
    if (!replyText.trim()) return alert("Wpisz treść odpowiedzi!");

    fetch(`http://localhost:5000/api/contact/${id}/reply`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: replyText }) 
    })
      .then(res => {
        if (!res.ok) throw new Error("Błąd przy wysyłaniu odpowiedzi");
        return res.json();
      })
      .then(updatedMsg => {
      
        setMessages(prev =>
          prev.map(msg =>
            msg.id === id ? { ...updatedMsg, replyText: '' } : msg
          )
        );
      })
      .catch(err => console.error(err));
  };


  const sortedMessages = [...messages].sort((a, b) =>
    (!!a.reply === !!b.reply) ? 0 : (!!a.reply ? 1 : -1)
  );

  return (
    <div className="admin-section">
      <h2>Wiadomości od odwiedzających</h2>
      {messages.length === 0 && <p>Brak wiadomości</p>}

      <div className="message-list">
        {sortedMessages.map((msg) => (
          <div key={msg.id} className="message-item">
            <div className="message-header">
              <strong>{msg.name || "Nieznany"}</strong> - <em>{msg.email || "Brak e-mail"}</em>
            </div>
            <p>{msg.message}</p>

            {!msg.reply ? (
              <>
                <textarea
                  placeholder="Napisz odpowiedź..."
                  value={msg.replyText}
                  onChange={(e) =>
                    setMessages(prev =>
                      prev.map(m =>
                        m.id === msg.id ? { ...m, replyText: e.target.value } : m
                      )
                    )
                  }
                />
                <div className="message-buttons">
                  <button onClick={() => deleteMessage(msg.id)}>Usuń</button>
                  <button onClick={() => sendReply(msg.id, msg.replyText)}>Wyślij odpowiedź</button>
                </div>
              </>
            ) : (
              <div className="answered-info">
                <p><strong>Odpowiedź wysłana:</strong> {msg.reply}</p>
                <button onClick={() => deleteMessage(msg.id)}>Usuń</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;

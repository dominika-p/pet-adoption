import { useState } from 'react';
import './AdminMessages.css';

const AdminMessages = () => {
  // Przykładowe wiadomości
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Anna Kowalska',
      email: 'anna@example.com',
      message: 'Chciałabym dowiedzieć się więcej o adopcji psa.',
      answered: false,
      reply: '',
      replyText: '',
    },
    {
      id: 2,
      name: 'Piotr Nowak',
      email: 'piotr@example.com',
      message: 'Czy można przyjść w weekend i pomóc w wolontariacie?',
      answered: false,
      reply: '',
      replyText: '',
    },
  ]);

  // Usuń wiadomość
  const deleteMessage = (id) =>
    setMessages(messages.filter((msg) => msg.id !== id));

  // Wyślij odpowiedź
  const sendReply = (id, replyText) => {
    if (!replyText.trim()) return;
    setMessages(prev =>
      prev.map(msg =>
        msg.id === id
          ? { ...msg, answered: true, reply: replyText, replyText: '' }
          : msg
      )
    );
  };

  // Sortujemy wiadomości: najpierw nieodpowiedziane
  const sortedMessages = [...messages].sort((a, b) =>
    a.answered === b.answered ? 0 : a.answered ? 1 : -1
  );

  return (
    <div className="admin-section">
      <h2>Wiadomości od odwiedzających</h2>
      {messages.length === 0 && <p>Brak wiadomości</p>}

      <div className="message-list">
        {sortedMessages.map((msg) => (
          <div key={msg.id} className="message-item">
            <div className="message-header">
              <strong>{msg.name}</strong> - <em>{msg.email}</em>
            </div>
            <p>{msg.message}</p>

            {!msg.answered ? (
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



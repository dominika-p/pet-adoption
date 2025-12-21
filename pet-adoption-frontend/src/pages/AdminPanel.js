import { useState } from 'react';
import AdminCalendar from './AdminCalendar';
import AdminAnimals from './AdminAnimals';
import AdminBlog from './AdminBlog';
import AdminVolunteers from './AdminVolunteers';
import AdminMessages from './AdminMessages';

import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('kalendarz');

  return (
    <div
      className="admin-page"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('/img/wolontariat2.jpg') center/cover no-repeat`,
      }}
    >
      <div className="admin-panel-container">
        <div className="admin-sidebar">
          <h2>Panel Administratora</h2>

          <button onClick={() => setActiveTab('kalendarz')}>Kalendarz</button>
          <button onClick={() => setActiveTab('zwierzaki')}>Zwierzaki</button>
          <button onClick={() => setActiveTab('wiadomosci')}>Wiadomości</button>
          <button onClick={() => setActiveTab('wolontariusze')}>Wolontariusze</button>
          <button onClick={() => setActiveTab('blog')}>Blog</button>
        </div>

        <div className="admin-main">
          {activeTab === 'kalendarz' && <AdminCalendar />}
          {activeTab === 'zwierzaki' && <AdminAnimals />}
          {activeTab === 'wiadomosci' && <AdminMessages />}
          {activeTab === 'wolontariusze' && <AdminVolunteers />}
          {activeTab === 'blog' && <AdminBlog />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;






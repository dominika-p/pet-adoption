import { useState } from 'react';
import './AdminBlog.css';

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    img: '',
  });

  // Dodaj nowy post
  const addPost = () => {
    if (!newPost.title || !newPost.img) return;
    setPosts([{ ...newPost, id: Date.now(), isEditing: false }, ...posts]);
    setNewPost({ title: '', content: '', img: '' });
  };

  // Usuń post
  const deletePost = (id) => setPosts(posts.filter((p) => p.id !== id));

  // Przełącz tryb edycji
  const toggleEdit = (id) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, isEditing: !p.isEditing } : p
      )
    );
  };

  // Zmiana pól podczas edycji
  const handleChange = (id, field, value) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  return (
    <div className="admin-section">
      <h2>Dodaj nowy post</h2>
      <div className="blog-form">
        <input
          type="text"
          placeholder="Tytuł posta"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Treść posta"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewPost({ ...newPost, img: URL.createObjectURL(e.target.files[0]) })
          }
        />
        <button onClick={addPost}>Dodaj post</button>
      </div>

      <h2>Lista postów</h2>
      <div className="blog-list">
        {posts.map((post) => (
          <div key={post.id} className="blog-item">
            <img src={post.img} alt={post.title} />
            <div className="blog-content">
              {post.isEditing ? (
                <>
                  <input
                    value={post.title}
                    onChange={(e) => handleChange(post.id, 'title', e.target.value)}
                  />
                  <textarea
                    value={post.content}
                    onChange={(e) => handleChange(post.id, 'content', e.target.value)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange(post.id, 'img', URL.createObjectURL(e.target.files[0]))}
                  />
                </>
              ) : (
                <>
                  <h4>{post.title}</h4>
                  <p>{post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}</p>
                </>
              )}
              <div className="blog-buttons" style={{ justifyContent: 'flex-end' }}>
                {post.isEditing ? (
                  <button onClick={() => toggleEdit(post.id)}>Zapisz</button>
                ) : (
                  <>
                    <button onClick={() => toggleEdit(post.id)}>Edytuj</button>
                    <button onClick={() => deletePost(post.id)}>Usuń</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;



import React from "react";
import "./BlogSection.css";
import { useNavigate } from "react-router-dom";

const BlogSection = ({ posts }) => {
  const navigate = useNavigate();

  // sortujemy od najnowszego do najstarszego
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
  );

  const handleShowMorePosts = () => {
    navigate("/blog"); // przekierowanie do strony z wszystkimi wpisami
  };

  return (
    <section className="blog-section">
      <h3>Ostatnie wpisy na blogu</h3>
      <div className="blog-list">
        {sortedPosts.slice(0, 4).map((post, i) => (
          <div key={i} className="blog-card">
            <img src={post.img} alt={post.title} className="blog-img" />
            <div className="blog-content">
              <h4>{post.title}</h4>
              <p>{post.excerpt}</p>
              <a
                href={post.link}  // link do artykułu
                className="read-more"
                onClick={(e) => {
                  e.preventDefault();       // nie przeładowuje strony
                  navigate(post.link);      // dynamiczne przekierowanie
                }}
              >
                Czytaj więcej
              </a>
            </div>
          </div>
        ))}
      </div>

      <button className="adopt-button" onClick={handleShowMorePosts}>
        Zobacz więcej wpisów
      </button>
    </section>
  );
};

export default BlogSection;






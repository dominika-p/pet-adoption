import React from "react";
import "./BlogSection.css";

const BlogSection = ({ posts }) => {
  return (
    <section className="blog-section">
      <h3>Ostatnie wpisy na blogu</h3>
      <div className="blog-list">
        {posts.slice(0, 4).map((post, i) => (
          <div key={i} className="blog-card">
            <img src={post.img} alt={post.title} className="blog-img" />
            <div className="blog-content">
              <h4>{post.title}</h4>
              <p>{post.excerpt}</p>
              <a href={post.link} className="blog-link">Czytaj więcej</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;

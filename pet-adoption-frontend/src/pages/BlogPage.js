import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import posts from "../data/postsData";
import "./BlogPage.css";

const BlogPage = () => {
  // sortowanie od najnowszego do najstarszego
  const sortedPosts = [...posts].reverse();

  // przewijanie na górę po wejściu na stronę
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      
      <header
        className="blog-page-header"
        style={{
          backgroundImage: "url('/img/blog-page.jpg')", 
        }}
      >
        <h1 className="blog-page-main-title">Blog schroniska</h1>
      </header>

      {/* --- Główna zawartość --- */}
      <div className="blog-page-wrapper">
        <h2 className="blog-page-title">Najnowsze wpisy</h2>
        <div className="blog-list-page">
          {sortedPosts.map((post, i) => (
            <div key={i} className="blog-card-page">
              <img src={post.img} alt={post.title} className="blog-img-page" />
              <div className="blog-content-page">
                <h4>{post.title}</h4>
                <p>{post.excerpt}</p>
                <Link to={post.link} className="blog-readmore">
                  Czytaj więcej &gt;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;






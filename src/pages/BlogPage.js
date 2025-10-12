import React from "react";
import { Link } from "react-router-dom";
import posts from "../data/postsData";
import "./BlogPage.css";

const BlogPage = () => {
  // sortowanie od najnowszego do najstarszego
  const sortedPosts = [...posts].reverse();

  return (
    <div className="blog-page-wrapper">
      <h2 className="blog-page-title">Blog</h2>
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
  );
};

export default BlogPage;




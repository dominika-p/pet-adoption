// src/pages/BlogArticle.js
import React from "react";
import { useParams } from "react-router-dom";
import posts from "../data/postsData";
import "./BlogArticle.css"; // importujemy nowy plik CSS

const BlogArticle = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.link.includes(slug));

  if (!post) return <p className="blog-article-not-found">Nie znaleziono artykułu</p>;

  return (
    <div className="blog-article-wrapper">
      <h1 className="blog-article-title">{post.title}</h1>
      <img src={post.img} alt={post.title} className="blog-article-img" />
      <p className="blog-article-content">{post.content}</p>
    </div>
  );
};

export default BlogArticle;

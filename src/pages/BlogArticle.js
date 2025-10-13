import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import posts from "../data/postsData";
import "./BlogArticle.css";

const BlogArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.link.endsWith(slug));

  // ⬇️ Przewinięcie do góry po załadowaniu artykułu
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <p className="blog-article-not-found">Nie znaleziono artykułu</p>;

  return (
    <div className="blog-article-container">
      {/* Nagłówek z tłem */}
      <header
        className="blog-article-header"
        style={{ backgroundImage: `url(${post.img})` }}
      >
        <h1 className="blog-article-title">{post.title}</h1>
      </header>

      {/* Treść artykułu */}
      <div className="blog-article-wrapper">
        <div
          className="blog-article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        {/* Przycisk powrotu do bloga */}
        <button
          className="back-to-blog"
          onClick={() => navigate("/blog")}
        >
          Powrót do artykułów
        </button>
      </div>
    </div>
  );
};

export default BlogArticle;






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const API_BASE_URL = 'https://blogsite-fullstack.onrender.com';

const CreatePost = () => {
  const navigate = useNavigate();

  const [newPost, setNewPost] = useState({
    title: "",
    author: "",
    body: "",
  });

  const handleChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/posts/${data._id}`);
      } else {
        console.error("Failed to create the post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="card-title">Create a New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newPost.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={newPost.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              name="body"
              value={newPost.body}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn blue">Create Post</button>
            <button type="button" onClick={() => navigate("/")} className="btn gray">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

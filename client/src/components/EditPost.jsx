import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css"; // Import your custom CSS

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

 const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch post");
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchPost();
}, [id]);

if (loading) return <div className="page-container"><p>Loading...</p></div>;
if (!post) return <div className="page-container"><p>Post not found.</p></div>;


  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        navigate(`/posts/${id}`);
      } else {
        console.error("Failed to update the post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="card-title">Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              id="body"
              name="body"
              value={post.body}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn blue">Update Post</button>
            <button type="button" onClick={() => navigate("/")} className="btn gray">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;

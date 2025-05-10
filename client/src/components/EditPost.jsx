import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  // Fetch the post to edit
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
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
        navigate(`/posts/${id}`); // Navigate to the updated post's page
      } else {
        console.error("Failed to update the post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-lg font-bold mb-2">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={post.body}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="6"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;

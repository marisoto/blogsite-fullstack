import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams(); // Get the post ID from the URL params
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', body: '' });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await response.json();
        setPost(data); // Populate the form with the existing post data
      } catch (error) {
        console.error('Error fetching post for edit:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post), // Send the updated post data
      });
      if (response.ok) {
        navigate(`/posts/${id}`); // After updating, navigate back to the post details page
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Body</label>
          <textarea
            name="body"
            value={post.body}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPost;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hardcoded API link
      await axios.post('https://blogsite-fullstack.onrender.com/api/posts', {
        title,
        body,
        author,
      });

      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <input
          className="block w-full p-2 border border-gray-300 rounded mb-4"
          type="text"
          placeholder="Author Name (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

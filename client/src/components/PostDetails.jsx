import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({ author: '', text: '' });

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${id}`);
      if (!response.ok) throw new Error('Post not found');
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/posts/${id}`, {
        method: 'DELETE',
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.text.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
      });
      if (response.ok) {
        setComment({ author: '', text: '' });
        fetchPost(); // Refresh comments
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;
  if (!post) return <div className="page-container"><p>Post not found.</p></div>;

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="card-title">{post.title}</h1>
        <p className="card-author"><strong>Author: </strong>{post.author || 'Anonymous'}</p>
        <p className="card-body">{post.body}</p>

        <div className="button-group">
          <button className="btn red" onClick={handleDelete}>Delete Post</button>
          <button className="btn blue" onClick={() => navigate(`/edit/${post._id}`)}>Update Post</button>
        </div>

        <div className="button-group">
          <button className="btn green" onClick={() => navigate('/')}>Return Home</button>
        </div>

        <hr />

        <h3>Comments</h3>
        <ul>
          {post.comments && post.comments.map((c, index) => (
            <li key={index}>
              <strong>{c.author || 'Anonymous'}:</strong> {c.text}
            </li>
          ))}
        </ul>

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <div className="form-group">
            <label htmlFor="author">Name (optional)</label>
            <input
              type="text"
              id="author"
              name="author"
              value={comment.author}
              onChange={(e) => setComment({ ...comment, author: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Comment</label>
            <textarea
              id="text"
              name="text"
              value={comment.text}
              onChange={(e) => setComment({ ...comment, text: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn blue">Submit Comment</button>
        </form>
      </div>
    </div>
  );
};

export default PostDetails;

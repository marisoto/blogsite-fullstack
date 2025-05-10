import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-pastel-purple p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-pastel-blue">
          {post.title}
        </h1>
        <p className="text-gray-700 text-lg mb-6">{post.body}</p>

        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={handleDelete}
            className="bg-red-400 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded"
          >
            Delete Post
          </button>
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded"
          >
            Update Post
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-green-300 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

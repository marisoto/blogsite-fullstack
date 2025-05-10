import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'DELETE',
      });
      navigate('/'); // Navigate back to the home page after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        <p className="text-gray-600 mt-4">{post.body}</p>
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Delete Post
          </button>
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Edit Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

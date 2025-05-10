import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
};

export default Home;

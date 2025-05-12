import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostList from "../components/PostList";
import "../index.css"; // Ensure this import is correct

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://blogsite-fullstack.onrender.com/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Notes</h1>

      <div className="create-post-wrapper">
        <Link to="/create">
          <button className="create-post-button">Create Post</button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
};

export default Home;



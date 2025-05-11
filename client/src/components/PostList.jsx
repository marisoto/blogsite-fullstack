import React from "react";
import { Link } from "react-router-dom";
import './PostList.css'; // Make sure to import the CSS file

const PostList = ({ posts }) => {
  // Function to truncate text to a certain length
  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  return (
    <div className="post-list-container">
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          {/* Title */}
          <h2 className="post-title">{post.title}</h2>

          {/* Author */}
          <p className="text-sm text-gray-600 text-center mb-4">
            By {post.author || "Anonymous"}
          </p>

          {/* Body Preview */}
          <p className="post-body">
            {truncateText(post.body, 150)} {/* Show first 150 characters */}
          </p>

          {/* Read More Link */}
          <Link
            to={`/posts/${post._id}`}
            className="post-link"
          >
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;

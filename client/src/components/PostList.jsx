import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="mb-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.body}</p>
          <Link to={`/posts/${post._id}`} className="text-blue-500">
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;

// routes/posts.js

const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Import the Post model

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts); // Not { posts: posts }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // Find the post by ID
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post); // Send the post data as the response
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// POST (Create) a new post
router.post('/', async (req, res) => {
  const { title, body } = req.body;
  const post = new Post({
    title,
    body,
  });

  try {
    const newPost = await post.save(); // Save the new post to the database
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id); // Delete the post by ID
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (Update) a post
router.put('/:id', async (req, res) => {
  const { title, body } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

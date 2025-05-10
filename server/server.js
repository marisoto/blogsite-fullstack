// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blogsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas
const CommentSchema = new mongoose.Schema({
  name: String,
  text: String,
});

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [CommentSchema],
});

const Post = mongoose.model('Post', PostSchema);

// Routes
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

app.post('/posts', async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.json(newPost);
});

app.post('/posts/:id/comments', async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push(req.body);
  await post.save();
  res.json(post);
});

app.listen(5000, () => console.log('Server running on port 5000'));

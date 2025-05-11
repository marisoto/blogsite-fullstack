// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true, // If you want the author to be required for each post
    default: 'Anonymous',
  },
  comments: [{
    author: { type: String, default: 'Anonymous' },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Post', postSchema);

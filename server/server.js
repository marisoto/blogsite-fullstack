// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts'); // Import the post routes

const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors()); // Allow cross-origin requests

// Use the routes
app.use('/posts', postRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

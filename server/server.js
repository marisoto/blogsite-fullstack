require('dotenv').config({ path: '../.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts'); // Import the post routes

const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors()); // Allow cross-origin requests

// Use the routes - prefix with '/api'
app.use('/api/posts', postRoutes);  // This ensures all post routes are under /api/posts

// MongoDB connection URI (with fallback)
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog';  // Default fallback

console.log('Mongo URI:', mongoURI);  // Debugging to ensure the URI is correct

mongoose.connect(mongoURI, {
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

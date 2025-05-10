const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);


const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndDelete(id); // Assuming you're using MongoDB and Mongoose
    res.status(200).send('Post deleted');
  } catch (error) {
    res.status(500).send('Error deleting post');
  }
});

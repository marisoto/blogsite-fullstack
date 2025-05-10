import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost'; // Import the EditPost component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/:id/edit" element={<EditPost />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;

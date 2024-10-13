import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import CreateBlog from './components/CreateBlog';
import MyNavbar from './components/Navbar';
import Home from './pages/Home';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const handleBlogCreated = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  return (
    <Router>
      <MyNavbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home blogs={blogs} />} />
          <Route path="/create" element={<CreateBlog onBlogCreated={handleBlogCreated} />} />
          <Route path="/blogs" element={<BlogList blogs={blogs} setBlogs={setBlogs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

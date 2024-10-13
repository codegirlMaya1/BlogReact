import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs, setBlogs }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, [setBlogs]);

  const handleDelete = useCallback((id) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
  }, [blogs, setBlogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => 
      (selectedUserId ? blog.userId === selectedUserId : true) &&
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blogs, selectedUserId, searchTerm]);

  return (
    <div>
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Control 
            type="text" 
            placeholder="Search blogs by title" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ backgroundColor: 'lightgray' }}
          />
        </Form.Group>
      </Form>
      <div className="row">
        {filteredBlogs.map(blog => (
          <div className="col-md-6 mb-4" key={blog.id}>
            <Card>
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.body}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">Posted on {new Date(blog.timestamp).toLocaleString()}</small>
                </Card.Footer>
                <Button variant="danger" onClick={() => handleDelete(blog.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
        <div className="col-md-6 mb-4">
          <Link to="/create">
            <Button variant="primary">Add New Blog</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogList;

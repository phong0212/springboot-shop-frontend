import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import axios from 'axios';
import api from '../../api/axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách blog từ backend
  const fetchBlogs = () => {
    setLoading(true);
    api.get('/blogs')
      .then(res => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi lấy danh sách blog:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa blog này?')) {
      api.delete(`/blogs/${id}`)
        .then(() => {
          alert('Đã xóa blog!');
          fetchBlogs(); // Tải lại danh sách sau khi xóa
        })
        .catch(err => {
          alert('Xóa blog thất bại!');
          console.error(err);
        });
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Blog List</h3>
        <Link to="/admin/blogs/add">
          <Button variant="success">+ Add Blog</Button>
        </Link>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Created At</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.blogId}>
              <td>{blog.blogId}</td>
              <td>{blog.title}</td>
              <td>{blog.author}</td>
              <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td>{blog.category}</td>
              <td>{blog.tags}</td>
              <td>
                <Link to={`/admin/blogs/view/${blog.blogId}`}>
                  <Button variant="info" size="sm" className="me-2">
                    <FaEye />
                  </Button>
                </Link>
                <Link to={`/admin/blogs/edit/${blog.blogId}`}>
                  <Button variant="warning" size="sm" className="me-2">
                    <FaEdit />
                  </Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(blog.blogId)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
          {blogs.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center">Chưa có blog nào.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;

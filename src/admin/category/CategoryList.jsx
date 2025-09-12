import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import api from '../../api/axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategory = () => {
    setLoading(true);
    api.get('/category')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi lấy danh sách category:', err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa brand?')) {
      api.delete(`/category/${id}`)
        .then(() => {
          alert('Đã xóa category!');
          fetchCategory();
        })
        .catch(err => {
          alert('Xóa category thất bại!');
          console.error(err);
        });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Category Management</h3>
        <Link to="/admin/categories/add">
          <Button variant="primary">+ Add Category</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>

            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.description}</td>
              <td>{cat.status ? 'Active' : 'Inactive'}</td>

              <td>
                <Link to={`/admin/categories/edit/${cat.id}`}>
                  <Button variant="warning" size="sm" className="me-2">
                    <FaEdit />
                  </Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(cat.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryList;

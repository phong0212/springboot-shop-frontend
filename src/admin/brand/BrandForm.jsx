import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/axios';

const AdminBrandForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true
  });

  // Lấy brand từ backend khi edit
  useEffect(() => {
    if (isEditMode) {
      api.get(`/brands/${id}`)
        .then(res => {
          setFormData({
            name: res.data.name,
            description: res.data.description,
            status: res.data.status
          });
        })
        .catch(err => {
          alert('Không tìm thấy brand!');
          navigate('/admin/brands');
        });
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      // PUT cập nhật
      api.put(`/brands/${id}`, formData)
        .then(() => {
          alert('Đã cập nhật brand!');
          navigate('/admin/brands');
        })
        .catch(err => {
          alert('Cập nhật thất bại!');
          console.error(err);
        });
    } else {
      // POST thêm mới
      api.post('/brands', formData)
        .then(() => {
          alert('Đã thêm brand!');
          navigate('/admin/brands');
        })
        .catch(err => {
          alert('Thêm thất bại!');
          console.error(err);
        });
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h3>{isEditMode ? 'Edit Brand' : 'Add New Brand'}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Brand Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter brand name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="status">
          <Form.Check
            type="checkbox"
            label="Active"
            name="status"
            checked={formData.status}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          {isEditMode ? 'Update Brand' : 'Add Brand'}
        </Button>
      </Form>
    </div>
  );
};

export default AdminBrandForm;

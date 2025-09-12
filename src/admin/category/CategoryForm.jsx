import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import api from '../../api/axios';

const fakeCategoryData = [
  { id: 1, name: 'Men', description: 'Thời trang nam' },
  { id: 2, name: 'Women', description: 'Thời trang nữ' },
  { id: 3, name: 'Shoes', description: 'Giày dép' },
  { id: 4, name: 'Kids', description: 'Đồ trẻ em' }
];

const AdminCategoryForm = () => {
  const { id } = useParams(); // Nếu có id thì là sửa
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true
  });

  useEffect(() => {
    if (isEditMode) {
      api.get(`/category/${id}`)
        .then(res => {
          setFormData({
            name: res.data.name,
            description: res.data.description,
            status: res.data.status
          });
        })
        .catch(err => {
          alert('Không tìm thấy category!');
          navigate('/admin/categories');
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
      api.put(`/category/${id}`, formData)
        .then(() => {
          alert('Đã cập nhật category!');
          navigate('/admin/categories');
        })
        .catch(err => {
          alert('Cập nhật thất bại!');
          console.error(err);
        });
    } else {
      // POST thêm mới
      api.post('/category', formData)
        .then(() => {
          alert('Đã thêm category!');
          navigate('/admin/categories');
        })
        .catch(err => {
          alert('Thêm thất bại!');
          console.error(err);
        });
    }
  };
  return (
     <div className="container mt-4" style={{ maxWidth: '600px' }}>
          <h3>{isEditMode ? 'Edit Category' : 'Add New Category'}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter category name"
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
              {isEditMode ? 'Update Category' : 'Add Category'}
            </Button>
          </Form>
        </div>
  );
};

export default AdminCategoryForm;

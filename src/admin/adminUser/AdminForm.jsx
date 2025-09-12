import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const AdminForm = ({ initialData = {}, roles = [], onSubmit }) => {
  const [formData, setFormData] = useState({
    admin_name: '',
    admin_email: '',
    admin_phone: '',
    admin_password: '',
    role_id: '',
  });

  useEffect(() => {
    if (initialData.admin_id) {
      setFormData({
        admin_name: initialData.admin_name || '',
        admin_email: initialData.admin_email || '',
        admin_phone: initialData.admin_phone || '',
        admin_password: '',
        role_id: initialData.role_id || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(onSubmit) onSubmit(formData);
  };

  return (
    <Container style={{ maxWidth: '600px' }} className="mt-4">
      <h4>{initialData.admin_id ? 'Sửa' : 'Thêm'} Admin</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="admin_name">
          <Form.Label>Tên Admin</Form.Label>
          <Form.Control
            type="text"
            name="admin_name"
            value={formData.admin_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="admin_email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="admin_email"
            value={formData.admin_email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="admin_phone">
          <Form.Label>Điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="admin_phone"
            value={formData.admin_phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="admin_password">
          <Form.Label>{initialData.admin_id ? 'Mật khẩu mới (để trống nếu không đổi)' : 'Mật khẩu'}</Form.Label>
          <Form.Control
            type="password"
            name="admin_password"
            value={formData.admin_password}
            onChange={handleChange}
            required={!initialData.admin_id}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="role_id">
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn Role --</option>
            {roles.map(role => (
              <option key={role.role_id} value={role.role_id}>
                {role.role_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          {initialData.admin_id ? 'Cập nhật' : 'Thêm'}
        </Button>
      </Form>
    </Container>
  );
};

export default AdminForm;

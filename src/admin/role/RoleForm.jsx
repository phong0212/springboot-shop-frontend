import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const RoleForm = ({ initialData = {}, onSubmit }) => {
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    if (initialData.role_id) {
      setRoleName(initialData.role_name || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(onSubmit) onSubmit({ role_name: roleName });
  };

  return (
    <Container style={{ maxWidth: '600px' }} className="mt-4">
      <h4>{initialData.role_id ? 'Sửa' : 'Thêm'} Role</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="role_name">
          <Form.Label>Tên Role</Form.Label>
          <Form.Control
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {initialData.role_id ? 'Cập nhật' : 'Thêm'}
        </Button>
      </Form>
    </Container>
  );
};

export default RoleForm;

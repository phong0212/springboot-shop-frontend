import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';

const RoleList = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles([
      { role_id: 1, role_name: 'Super Admin', created_at: '2025-01-01' },
      { role_id: 2, role_name: 'Staff', created_at: '2025-02-01' },
    ]);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa role này?')) {
      console.log('Xóa role ID:', id);
    }
  };

  return (
    <Container className="mt-4">
      <h4>Danh sách Role</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Role</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.role_id}>
              <td>{role.role_id}</td>
              <td>{role.role_name}</td>
              <td>{role.created_at}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(role.role_id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RoleList;

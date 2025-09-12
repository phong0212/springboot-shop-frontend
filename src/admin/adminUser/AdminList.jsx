import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import api from '../../api/axios';
const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách admin
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await api.get('/auth'); 
      setAdmins(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách admin:', err);
      alert('Có lỗi khi tải danh sách');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Toggle role
  const handleToggleRole = async (id) => {
    const admin = admins.find(a => a.id === id);
    if (!admin) return;

    const newRoleId = admin.role_name === 'Admin' ? 2 : 1;
    try {
      const res = await api.patch(`/auth/${id}/role`, { role_id: newRoleId });
      setAdmins(prev => prev.map(a => a.id === id ? { ...a, role_name: res.data.role_name } : a));
      alert('Cập nhật role thành công');
    } catch (err) {
      console.error('Lỗi khi cập nhật role:', err);
      alert('Có lỗi khi cập nhật role');
    }
  };

  // Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa tài khoản này?')) return;

    try {
      await api.delete(`/auth/${id}`);
      setAdmins(prev => prev.filter(a => a.id !== id));
      alert('Đã xóa tài khoản');
    } catch (err) {
      console.error('Lỗi khi xóa:', err);
      alert('Xóa thất bại');
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <Container className="mt-4">
      <h4>Danh sách Admin</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Ngày sinh</th>
            <th>Role</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
              <td>{admin.birthDate}</td>
              <td>{admin.role_name}</td>
              <td>
                <Button
                  variant="secondary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleToggleRole(admin.id)}
                >
                  {admin.role_name === 'Admin' ? 'Đổi thành Client' : 'Đổi thành Admin'}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(admin.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
          {admins.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">Chưa có tài khoản nào.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminList;

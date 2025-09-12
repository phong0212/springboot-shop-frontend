import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import api from '../../api/axios';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách brand từ backend
  const fetchBrands = () => {
    setLoading(true);
    api.get('/brands')
      .then(res => {
        setBrands(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi lấy danh sách brand:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa brand?')) {
      api.delete(`/brands/${id}`)
        .then(() => {
          alert('Đã xóa brand!');
          fetchBrands(); // Tải lại danh sách sau khi xóa
        })
        .catch(err => {
          alert('Xóa brand thất bại!');
          console.error(err);
        });
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Brand List</h3>
        <Link to="/admin/brands/add">
          <Button variant="success">+ Add Brand</Button>
        </Link>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>{brand.description}</td>
              <td>{brand.status ? 'Active' : 'Inactive'}</td>
              <td>
                <Link to={`/admin/brands/edit/${brand.id}`}>
                  <Button variant="warning" size="sm" className="me-2">
                    <FaEdit />
                  </Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(brand.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
          {brands.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">Chưa có brand nào.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BrandList;

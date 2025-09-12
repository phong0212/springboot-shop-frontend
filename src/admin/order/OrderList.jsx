import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  const fetchOrders = () => {
    if (search.trim() === '') {
      api.get('/orders')
        .then(res => setOrders(res.data))
        .catch(err => console.error(err));
    } else {
      api.get(`/orders/search?code=${search}`)
        .then(res => setOrders(res.data))
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search]);
  useEffect(() => {
    api.get('/orders')
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
      api.delete(`/orders/${id}`)
        .then(() => {
          setOrders(orders.filter(order => order.id !== id)); // Cập nhật lại state
          alert('Xóa đơn hàng thành công');
        })
        .catch(err => {
          console.error(err);
          alert('Xóa đơn hàng thất bại');
        });
    }
  };
  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md={6}>
          <h4>Danh sách đơn hàng</h4>
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm mã đơn hàng..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.orderCode}</td>
              <td>{order.username}</td>
              <td>
                {order.orderDetails
                  .reduce((sum, item) => sum + item.productPrice * item.quantity, 0)
                  .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </td>
              <td>{order.orderStatus}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/orders/${order.id}`}>
                  <Button variant="info" size="sm" className="me-2">Xem</Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(order.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderList;

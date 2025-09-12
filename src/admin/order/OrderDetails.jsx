import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/axios';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(res => {
        setOrder(res.data);
        setStatus(res.data.orderStatus); // Set trạng thái hiện tại
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!order) return <Container><p>Loading...</p></Container>;

  const totalPrice = order.orderDetails.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  // Hàm gọi API update trạng thái
  const handleUpdateStatus = () => {
    api.patch(`/orders/${id}/status`, { status })
      .then(res => {
        setOrder(res.data);
        alert('Cập nhật trạng thái thành công!');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="app-content">
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <h1 className="dash__h1 u-s-m-b-30">Order Details #{order.orderCode}</h1>

            <Row className="mb-3">
              <Col md={6}>
                <h5>Thông tin khách hàng</h5>
                <p><strong>Tên:</strong> {order.username}</p>
                <p><strong>Địa chỉ giao hàng:</strong> {order.shipping.shippingAddress}</p>
                <p><strong>Email:</strong> {order.shipping.shippingEmail}</p>
                <p><strong>Phương thức:</strong> {order.shipping.shippingMethod}</p>
              </Col>
              <Col md={6}>
                <h5>Thông tin đơn hàng</h5>
                <p><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Tổng tiền:</strong> {totalPrice.toLocaleString()} ₫</p>

                {/* Dropdown thay đổi trạng thái */}
                <Form.Group className="mb-2">
                  <Form.Label><strong>Trạng thái:</strong></Form.Label>
                  <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={handleUpdateStatus}>Cập nhật trạng thái</Button>
              </Col>
            </Row>

            <Row>
              <Col>
                <h5>Chi tiết sản phẩm</h5>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Size</th>
                      <th>Color</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderDetails.map((item, index) => (
                      <tr key={index}>
                        <td>{item.productName}</td>
                        <td>{item.size || '-'}</td>
                        <td>{item.color || '-'}</td>
                        <td>{item.productPrice.toLocaleString()} ₫</td>
                        <td>{item.quantity}</td>
                        <td>{(item.productPrice * item.quantity).toLocaleString()} ₫</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row>
              <Col>
                <Link to="/admin/orders">
                  <Button variant="secondary">Quay lại danh sách đơn hàng</Button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

import React from "react";
import { Card, Row, Col, Table, Badge } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
    const stats = {
        orders: 120,
        products: 80,
        customers: 45,
        revenue: 15200000,
    };

    const recentOrders = [
        { id: 'ORD001', customer: 'Nguyễn Văn A', total: 1200000, status: 'Đang xử lý', date: '05/08/2025' },
        { id: 'ORD002', customer: 'Trần Thị B', total: 890000, status: 'Đã giao', date: '04/08/2025' },
        { id: 'ORD003', customer: 'Lê Văn C', total: 2150000, status: 'Đã hủy', date: '04/08/2025' },
    ];
    const revenueData = {
        labels: ['Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8'],
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: [5_000_000, 8_000_000, 6_500_000, 10_000_000, 15_000_000],
                backgroundColor: '#007bff',
            },
        ],
    };

    const categoryData = {
        labels: ['Thời trang nam', 'Thời trang nữ', 'Giày dép', 'Phụ kiện'],
        datasets: [
            {
                label: 'Tỉ lệ sản phẩm',
                data: [30, 25, 20, 25],
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
            },
        ],
    };

    return (
        <div className="p-4">
            <h3 className="mb-4">📊 Thống kê tổng quan</h3>
            <Row className="mb-4">
                <Col md={3}>
                    <Card bg="primary" text="white">
                        <Card.Body>
                            <Card.Title>Đơn hàng</Card.Title>
                            <Card.Text style={{ fontSize: '1.5rem' }}>{stats.orders}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card bg="success" text="white">
                        <Card.Body>
                            <Card.Title>Sản phẩm</Card.Title>
                            <Card.Text style={{ fontSize: '1.5rem' }}>{stats.products}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card bg="warning" text="white">
                        <Card.Body>
                            <Card.Title>Khách hàng</Card.Title>
                            <Card.Text style={{ fontSize: '1.5rem' }}>{stats.customers}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card bg="danger" text="white">
                        <Card.Body>
                            <Card.Title>Doanh thu</Card.Title>
                            <Card.Text style={{ fontSize: '1.5rem' }}>
                                {stats.revenue.toLocaleString('vi-VN')} ₫
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={8}>
                    <Card>
                        <Card.Header>📈 Doanh thu theo tháng</Card.Header>
                        <Card.Body>
                            <Bar data={revenueData} options={{ responsive: true }} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Header>📦 Tỉ lệ danh mục sản phẩm</Card.Header>
                        <Card.Body>
                            <Doughnut data={categoryData} options={{ responsive: true }} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h4 className="mb-3">🧾 Đơn hàng gần đây</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã đơn</th>
                        <th>Khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Ngày đặt</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.total.toLocaleString('vi-VN')} ₫</td>
                            <td>{order.date}</td>
                            <td>
                                <Badge
                                    bg={
                                        order.status === 'Đã giao' ? 'success' :
                                            order.status === 'Đã hủy' ? 'danger' : 'warning'
                                    }
                                >
                                    {order.status}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
export default AdminDashboard;
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Spinner, Image, Table } from 'react-bootstrap';

function AdminProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Giả lập API fetch
    useEffect(() => {
        async function fetchProductDetail() {
            try {
                // TODO: thay bằng API thật
                const res = await fetch('/fake-product.json'); // <- lấy từ public/
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error('Lỗi khi load chi tiết sản phẩm:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProductDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!product) {
        return <div className="text-center mt-5 text-danger">Không tìm thấy sản phẩm</div>;
    }

    return (
        <Container className="my-4">
            <h3>Chi tiết sản phẩm</h3>
            <Row className="mt-3">
                <Col md={4}>
                    <Card>
                        <Card.Img variant="top" src={product.product_image} />
                        <Card.Body>
                            <Card.Title>{product.product_name}</Card.Title>
                            <Card.Text>{product.product_desc}</Card.Text>
                        </Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Giá: {product.product_price}đ</ListGroup.Item>
                            <ListGroup.Item>Trạng thái: {product.product_status === 1 ? 'Hiển thị' : 'Ẩn'}</ListGroup.Item>
                            <ListGroup.Item>Danh mục: {product.category_name}</ListGroup.Item>
                            <ListGroup.Item>Thương hiệu: {product.brand_name}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

                <Col md={8}>
                    <h5>Biến thể sản phẩm</h5>
                    {product.variants?.length > 0 ? (
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                    <th>Ảnh</th>
                                    <th>Màu</th>
                                    <th>Size</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.variants.map((variant) => (
                                    <tr key={variant.variant_id}>
                                        <td>
                                            <Image src={variant.image_url} width="60" height="60" rounded />
                                        </td>
                                        <td>{variant.color}</td>
                                        <td>{variant.size}</td>
                                        <td>{variant.quantity}</td>
                                        <td>{variant.price}đ</td>
                                        <td>{variant.status === 1 ? 'Hiển thị' : 'Ẩn'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-muted">Không có biến thể nào</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default AdminProductDetail;

import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
function ProductList() {

    const [products, setProducts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);

    // Load tất cả sản phẩm
    const fetchAllProducts = () => {
        setLoading(true);
        api.get("/admin/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const handleSearch = () => {
        if (!searchKeyword.trim()) {
            fetchAllProducts();
            return;
        }
        setLoading(true);
        api.get(`/admin/products/search`, {
            params: { keyword: searchKeyword }
        })
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            api.delete(`/admin/products/${id}`)
                .then(() => {
                    setProducts(products.filter(p => p.id !== id));
                })
                .catch(err => console.error(err));
        }
    };
    if (loading) return <p className="text-center mt-4">Đang tải dữ liệu...</p>;

    return (
        <Container fluid className="mt-4">
            <Row className="mb-3">
                <Col><h4>Danh sách sản phẩm</h4></Col>
                <Col className="text-end">
                    <Link to={`/admin/products/add`}>
                        <Button variant="success">
                            <FaPlus className="me-2" /> Thêm sản phẩm
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={4}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Tìm theo tên sản phẩm..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button variant="primary" onClick={handleSearch}>Tìm</Button>
                    </InputGroup>
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Giá</th>
                        <th>Danh mục</th>
                        <th>Thương hiệu</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.productName}</td>
                            <td style={{ width: 150, height: 150 }}>
                                <img
                                    src={prod.mainImage?.trim()
                                        ? `${process.env.REACT_APP_IMAGE_URL}/images/${prod.mainImage.trim()}`
                                        : "/fallback-image.png"}
                                    alt={prod.productName}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />

                            </td>
                            <td>{prod.productPrice.toLocaleString()} ₫</td>
                            <td>{prod.categoryName}</td>
                            <td>{prod.brandName}</td>
                            <td>
                                <div className="d-flex flex-wrap gap-2">
                                    <Link to={`/admin/products/${prod.id}/edit`}>
                                        <Button variant="warning" size="sm"><FaEdit /></Button>
                                    </Link>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(prod.id)}>
                                        <FaTrash />
                                    </Button>
                                    <Link to={`/admin/products/${prod.id}/variants`}>
                                        <Button variant="secondary" size="sm" title="Variants">
                                            <FaList />
                                        </Button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ProductList;

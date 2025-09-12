import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import '../assets/css/Sidebar.css';
const AdminSidebar = () => {
   return (
      <div
        className="bg-dark text-white vh-100 d-flex flex-column"
        style={{ width: '250px' }}
      >
        <div className="p-3 fs-4 fw-bold border-bottom border-secondary">
          Ecommerce
        </div>
  
        <Nav defaultActiveKey="#" className="flex-column px-2 sidebar">
          {/* Dashboard */}
          <div className='mb-3'>
            <Nav.Link href="/admin/dashboard" className="text-white">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Nav.Link>
          </div>
          <div className='mb-3'>
            {/* Danh mục */}
            <NavDropdown
              title={<span><i className="bi bi-folder2-open me-2"></i> Danh mục</span>}
              id="sidebar-category-dropdown"
              className="text-white"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/admin/categories/add" className='mb-2'>Thêm danh mục</NavDropdown.Item>
              <NavDropdown.Item href="/admin/categories" className='mb-2'>Quản lý danh mục</NavDropdown.Item>
            </NavDropdown>
          </div>
          {/* Thương hiệu */}
          <div className='mb-3'>
            <NavDropdown
              title={<span><i className="bi bi-tags me-2"></i> Thương hiệu</span>}
              id="sidebar-brand-dropdown"
              className="text-white"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/admin/brands/add" className='mb-2'>Thêm thương hiệu</NavDropdown.Item>
              <NavDropdown.Item href="/admin/brands" className='mb-2' >Quản lý thương hiệu</NavDropdown.Item>
            </NavDropdown>
          </div>
          {/* Sản phẩm */}
          <div className='mb-3'>
            <NavDropdown
              title={<span><i className="bi bi-box me-2"></i> Sản phẩm</span>}
              id="sidebar-product-dropdown"
              className="text-white"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/admin/products/add" className='mb-2'>Thêm sản phẩm</NavDropdown.Item>
              <NavDropdown.Item href="/admin/productlist" className='mb-2'>Quản lý sản phẩm</NavDropdown.Item>
  
            </NavDropdown>
          </div>
          {/* Đơn hàng */}
          <div className='mb-3'>
  
            <NavDropdown
              title={<span><i className="bi bi-receipt me-2"></i> Đơn hàng</span>}
              id="sidebar-order-dropdown"
              className="text-white"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/admin/orders" className='mb-2'>Danh sách đơn hàng</NavDropdown.Item>
            </NavDropdown>
          </div>
          {/* Khách hàng */}
          <div className='mb-3'>
            <NavDropdown
              title={<span><i className="bi bi-people me-2"></i> Khách hàng</span>}
              id="sidebar-customer-dropdown"
              className="text-white"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/admin/customers" className='mb-2'>Danh sách khách hàng</NavDropdown.Item>
              <NavDropdown.Item href="/admin/customers/add" className='mb-2'>Thêm khách hàng</NavDropdown.Item>
            </NavDropdown>
          </div>
          <div className='mb-3'>
            {/* Quản trị viên & Vai trò */}
            <NavDropdown
              title={<span><i className="bi bi-person-gear me-2"></i> Quản trị</span>}
              id="sidebar-admin-dropdown"
              className="text-white"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/admin/adminList" className='mb-2'>Danh sách quản trị viên</NavDropdown.Item>
              <NavDropdown.Item href="/admin/adminList/add" className='mb-2'>Thêm quản trị viên</NavDropdown.Item>
              <NavDropdown.Item href="/admin/role" className='mb-2'>Danh sách vai trò</NavDropdown.Item>
              <NavDropdown.Item href="/admin/role/add" className='mb-2'>Thêm vai trò</NavDropdown.Item>
            </NavDropdown>
  
  
          </div>
          <div className='mb-3'>
            <Nav.Link href="/admin/contact" className="text-white">
              <i className="bi bi-speedometer2 me-2"></i> Quản lý liên hệ
            </Nav.Link>
          </div>
          <div className='mb-3'>
            <Nav.Link href="/admin/blogs" className="text-white">
              <i className="bi bi-speedometer2 me-2"></i> Quản lý bài viết
            </Nav.Link>
          </div>
        </Nav>
  
      </div>
    );
};

export default AdminSidebar;

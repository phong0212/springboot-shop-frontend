import { Navbar, Nav, NavDropdown, Container, Button, Image } from 'react-bootstrap';

function AdminNavbar() {
    return (
         <Navbar bg="primary" variant="dark" expand="lg">
                    <Container fluid className='px-4'>
                        <Navbar.Brand href="#">Ecommerce</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            
                            {/* Các nav bên phải */}
                            <Nav className="ms-auto align-items-center">
        
                                {/* Ảnh profile */}
                                <Image
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    roundedCircle
                                    alt="Profile"
                                    className="me-2"
                                    style={{ width: '30px', height: '30px' }}
                                />
        
                                {/* Dropdown Profile */}
                                <NavDropdown title="Profile" id="profile-dropdown" align="end">
                                    <NavDropdown.Item href="#profile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                                </NavDropdown>
        
                                {/* Nút Sign Out */}
                                <Button variant="outline-light" className="ms-3">
                                    Sign Out
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
    );
}

export default AdminNavbar;

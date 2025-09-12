import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import api from '../../api/axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Load tất cả liên hệ
  const fetchContacts = () => {
    setLoading(true);
    if (!search.trim()) {
      api.get("/contacts")
        .then(res => setContacts(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    } else {
      api.get(`/contacts/search?keyword=${encodeURIComponent(search)}`)
        .then(res => setContacts(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [search]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa liên hệ này?")) {
      api.delete(`/contacts/${id}`)
        .then(() => {
          setContacts(contacts.filter(c => c.contactId !== id));
          alert("Xóa liên hệ thành công");
        })
        .catch(err => {
          console.error(err);
          alert("Xóa liên hệ thất bại");
        });
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    api.put(`/contacts/${id}/status?status=${newStatus}`)
      .then(res => {
        setContacts(contacts.map(c => c.contactId === id ? res.data : c));
      })
      .catch(err => console.error(err));
  };

  if (loading) return <p className="text-center mt-4">Đang tải dữ liệu...</p>;

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col md={6}>
          <h4>Danh sách liên hệ</h4>
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Status</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.contactId}>
              <td>{contact.contactId}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
              <td>
                <Form.Select
                  value={contact.status}
                  onChange={e => handleUpdateStatus(contact.contactId, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </Form.Select>
              </td>
              <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(contact.contactId)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ContactList;

import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/axios';
const BlogAddForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    tags: "",
    content: "",
    imageFile: null,        // File ảnh
    imageName: "",          // Tên file
    previewUrl: ""          // Hiển thị ảnh preview
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      setFormData({
        ...formData,
        imageFile: file,
        imageName: file ? file.name : "",
        previewUrl: file ? URL.createObjectURL(file) : ""
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = null;
    if (formData.imageFile) {
      base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(formData.imageFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }

    const payload = {
      title: formData.title,
      author: formData.author,
      category: formData.category,
      tags: formData.tags,
      content: formData.content,
      imageBase64: base64Image,   // ảnh base64
      imageName: formData.imageName
    };

    api.post('/blogs', payload)
      .then(res => {
        alert('Tạo blog thành công!');
        navigate('/admin/blogs');
      })
      .catch(err => {
        console.error(err);
        alert('Tạo blog thất bại!');
      });
  };

  return (
    <Container className="mt-4">
      <h3>Thêm Blog Mới</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title"
            value={formData.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author"
            value={formData.author} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category"
            value={formData.category} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags (comma separated)</Form.Label>
          <Form.Control type="text" name="tags"
            value={formData.tags} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={6} name="content"
            value={formData.content} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ảnh minh họa</Form.Label>
          <Form.Control type="file" name="imageFile" accept="image/*" onChange={handleChange} />
          {formData.previewUrl && (
            <img src={formData.previewUrl} alt="preview" className="mt-2" style={{ width: 150, height: 150, objectFit: "cover" }} />
          )}
        </Form.Group>
        <Button type="submit" variant="success">Tạo Blog</Button>
      </Form>
    </Container>
  );
};

export default BlogAddForm;

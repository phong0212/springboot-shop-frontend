import React, { useEffect, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/axios';

const BlogEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(res => {
        const blog = res.data;
        setTitle(blog.title);
        setAuthor(blog.author);
        setCategory(blog.category);
        setTags(blog.tags);
        setContent(blog.content);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBlog = { title, author, category, tags, content };

    api.put(`/blogs/${id}`, updatedBlog)
      .then(res => {
        alert('Cập nhật blog thành công!');
        navigate('/admin/blogs');
      })
      .catch(err => {
        console.error(err);
        alert('Cập nhật blog thất bại!');
      });
  };

  return (
    <Container className="mt-4">
      <h3>Chỉnh Sửa Blog</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" value={author} onChange={e => setAuthor(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" value={category} onChange={e => setCategory(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags (comma separated)</Form.Label>
          <Form.Control type="text" value={tags} onChange={e => setTags(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={6} value={content} onChange={e => setContent(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="warning">Cập Nhật Blog</Button>
      </Form>
    </Container>
  );
};

export default BlogEditForm;

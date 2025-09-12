import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

// Fake data edit
const fakeImages = [
  {
    image_id: "img1",
    product_id: "p1",
    url: "/images/product/product-1.jpg",
  },
];

const AdminImageForm = () => {
  const { product_id, image_id } = useParams();
  const isEdit = Boolean(image_id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    url: "",
  });

  useEffect(() => {
    if (isEdit) {
      const image = fakeImages.find((img) => img.image_id === image_id);
      if (image) {
        setFormData({ url: image.url });
      }
    }
  }, [isEdit, image_id]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ url: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      console.log("Update image:", { image_id, ...formData });
      alert("Image updated!");
    } else {
      console.log("Add image:", { product_id, ...formData });
      alert("Image added!");
    }
    navigate(`/admin/products/${product_id}/images`);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">{isEdit ? "Edit" : "Add"} Image</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          {isEdit ? "Update" : "Add"} Image
        </Button>
      </Form>
    </div>
  );
};

export default AdminImageForm;

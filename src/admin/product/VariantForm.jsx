import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import api from "../../api/axios";
const AdminVariantForm = () => {
  const { product_id, variant_id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(variant_id);

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [formData, setFormData] = useState({
    size: "",
    color: "",
    quantity: "",
    status: true,
    images: [],           // File objects
    previewImages: [],    // URL previews
  });

  // Tự động fill dữ liệu khi edit
  useEffect(() => {
    if (isEdit) {

    }
  }, [isEdit, variant_id, product_id]);


  useEffect(() => {
    api.get("/sizes")
      .then(res => setSizes(res.data))
      .catch(err => console.error(err));

    api.get("/colors")
      .then(res => setColors(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "images") {
      const fileList = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: fileList,
        previewImages: fileList.map((file) => URL.createObjectURL(file)),
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const convertFilesToBase64WithName = (files) =>
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve({ name: file.name, base64: reader.result });
            reader.onerror = (err) => reject(err);
          })
      )
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imagesData = await convertFilesToBase64WithName(formData.images);

      const payload = {
        productId: Number(product_id),
        sizeId: Number(formData.size),
        colorId: Number(formData.color),
        quantity: Number(formData.quantity),
        status: formData.status,
        imageNames: imagesData.map((i) => i.name),
        imageBase64: imagesData.map((i) => i.base64),
      };

      const url = isEdit
        ? `/admin/products/${product_id}/variants/${variant_id}`
        : `/admin/products/${product_id}/variants`;

      if (isEdit) {
        await api.put(url, payload);
        alert("Variant updated!");
      } else {
        await api.post(url, payload);
        alert("Variant added!");
      }

      navigate(`/admin/products/${product_id}/variants`);
    } catch (err) {
      console.error(err);
      alert("Error adding/updating variant");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4">{isEdit ? "Edit" : "Add"} Variant</h3>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Size</Form.Label>
          <Form.Select
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Size --</option>
            {sizes.map(s => (
              <option key={s.sizeId} value={s.sizeId}>
                {s.sizeName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Color</Form.Label>
          <Form.Select
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Color --</option>
            {colors.map(c => (
              <option key={c.colorId} value={c.colorId}>
                {c.colorName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            min="0"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 form-check">
          <Form.Check
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            label="Active"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
          <div className="mt-2 d-flex gap-2 flex-wrap">
            {formData.previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx}`}
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
            ))}
          </div>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          {isEdit ? "Update" : "Add"} Variant
        </Button>
      </Form>
    </div>
  );
};

export default AdminVariantForm;

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/axios';
const AdminVariantList = () => {
  const { product_id } = useParams();
const [variants, setVariants] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchVariants = async () => {
    try {
      const res = await api.get(`/admin/products/${product_id}/variants`);
      setVariants(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching variants");
    } finally {
      setLoading(false);
    }
  };

  fetchVariants();
}, [product_id]);

const handleDelete = async (variantId) => {
  if (!window.confirm("Are you sure to delete this variant?")) return;

  try {
    await api.delete(`/admin/products/${product_id}/variants/${variantId}`);
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
    alert("Variant deleted");
  } catch (err) {
    console.error(err);
    alert("Error deleting variant");
  }
};

  if (loading) return <p>Loading variants...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Variants of Product: {product_id}</h4>
        <Link to={`/admin/products/${product_id}/variants/add`}>
          <Button variant="success">
            <FaPlus /> Add Variant
          </Button>
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Size</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.sizeName}</td>
              <td>{v.colorName}</td>
              <td>{v.quantity}</td>
              <td>{v.status ? 'Active' : 'Inactive'}</td>
              <td>
                <div className="d-flex gap-1">
                  {v.imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`variant-${index}`} width="100" height="100" />
                  ))}

                </div>
              </td>
              <td>
                <Link to={`/admin/products/${product_id}/variants/${v.id}/edit`}>
                  <Button variant="warning" size="sm" className="me-2">
                    <FaEdit />
                  </Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(v.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminVariantList;

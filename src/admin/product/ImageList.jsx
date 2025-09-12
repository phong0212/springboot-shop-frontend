import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaPlus } from "react-icons/fa";

// Fake data ảnh
const fakeImages = [
  {
    image_id: "img1",
    product_id: "p1",
    url: "/images/product/product-1.jpg",
  },
  {
    image_id: "img2",
    product_id: "p1",
    url: "/images/product/product-2.jpg",
  },
];

const AdminImageList = () => {
  const { product_id } = useParams();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Images for Product: {product_id}</h3>
        <Link to={`/admin/products/${product_id}/images/add`}>
          <Button variant="primary">
            <FaPlus className="me-1" />
            Add Image
          </Button>
        </Link>
      </div>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Preview</th>
            <th>Image URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fakeImages.map((img, index) => (
            <tr key={img.image_id}>
              <td>{index + 1}</td>
              <td>
                <img src={img.url} alt="" width="80" height="80" />
              </td>
              <td>{img.url}</td>
              <td>
                <Link
                  to={`/admin/products/${product_id}/images/${img.image_id}/edit`}
                >
                  <Button variant="warning" size="sm">
                    <FaEdit />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminImageList;

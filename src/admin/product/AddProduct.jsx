import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api/axios';

const AddProduct = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    productDesc: "",
    productPrice: "",
    productStatus: true,
    categoryId: "",
    brandId: "",
    productImage: null,        // File object mới
    productImageName: "",      // Tên file mới hoặc file cũ
    currentImageUrl: "",       // URL image cũ để hiển thị
    mainMaterial: "",
    sleeves: "",
    neck: "",
    piecesCount: "",
    occasion: "",
  });

  // Load categories & brands
  useEffect(() => {
    api.get("/category")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    api.get("/brands")
      .then(res => setBrands(res.data))
      .catch(err => console.error(err));
  }, []);

  // Load product nếu edit
  useEffect(() => {
    if (product_id) {
      api.get(`/admin/products/${product_id}`)
        .then(res => {
          const product = res.data;
          setFormData({
            productName: product.productName || "",
            productDesc: product.productDesc || "",
            productPrice: product.productPrice || "",
            productStatus: product.productStatus ?? true,
            categoryId: product.categoryId || "",
            brandId: product.brandId || "",
            productImage: null,
            productImageName: product.productImageName || "",
            currentImageUrl: product.productImageName
              ? `${process.env.REACT_APP_API_URL.replace("/api", "")}/images/${product.productImageName}`
              : "",
            mainMaterial: product.mainMaterial || "",
            sleeves: product.sleeves || "",
            neck: product.neck || "",
            piecesCount: product.piecesCount || "",
            occasion: product.occasion || "",
          });
        })
        .catch(err => console.error(err));
    }
  }, [product_id]);


  // Handle input
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "productImage") {
      setFormData({
        ...formData,
        productImage: files[0] || null,
        productImageName: files[0] ? files[0].name : formData.productImageName
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = null;
    if (formData.productImage) {
      base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(formData.productImage);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }

    const payload = {
      productName: formData.productName,
      productDesc: formData.productDesc,
      productPrice: Number(formData.productPrice),
      productStatus: formData.productStatus,
      categoryId: formData.categoryId,
      brandId: formData.brandId,
      mainMaterial: formData.mainMaterial,
      sleeves: formData.sleeves,
      neck: formData.neck,
      piecesCount: formData.piecesCount,
      occasion: formData.occasion,
      productImageBase64: base64Image,
      productImageName: formData.productImageName
    };

    const url = product_id
      ? `/admin/products/${product_id}`
      : `/admin/products`;
    const method = product_id ? "put" : "post";

    api[method](url, payload)
      .then(() => {
        alert(product_id ? "Product updated!" : "Product added!");
        navigate("/admin/productlist");
      })
      .catch(err => console.error(err));
  };


  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">{product_id ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Tên, mô tả, giá */}
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" name="productName" className="form-control"
            value={formData.productName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="productDesc" className="form-control"
            value={formData.productDesc} onChange={handleChange} rows="3" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₫)</label>
          <input type="number" name="productPrice" className="form-control"
            value={formData.productPrice} onChange={handleChange} min="0" step="1000" required />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" name="productStatus" className="form-check-input"
            checked={formData.productStatus} onChange={handleChange} />
          <label className="form-check-label">Active</label>
        </div>

        {/* Category & Brand */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="categoryId" className="form-select"
            value={formData.categoryId} onChange={handleChange} required>
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <select name="brandId" className="form-select"
            value={formData.brandId} onChange={handleChange} required>
            <option value="">Select brand</option>
            {brands.map(br => (
              <option key={br.id} value={br.id}>{br.name}</option>
            ))}
          </select>
        </div>

        {/* Optional fields */}
        <div className="mb-3">
          <label className="form-label">Main Material</label>
          <input type="text" name="mainMaterial" className="form-control"
            value={formData.mainMaterial} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Sleeves</label>
          <input type="text" name="sleeves" className="form-control"
            value={formData.sleeves} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Neck</label>
          <input type="text" name="neck" className="form-control"
            value={formData.neck} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Pieces Count</label>
          <input type="text" name="piecesCount" className="form-control"
            value={formData.piecesCount} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Occasion</label>
          <input type="text" name="occasion" className="form-control"
            value={formData.occasion} onChange={handleChange} />
        </div>

        {/* Image upload */}
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input type="file" name="productImage" className="form-control"
            accept="image/*" onChange={handleChange} />
          {formData.currentImageUrl && !formData.productImage && (
            <img src={formData.currentImageUrl} alt="Current" className="mt-2" style={{ width: 150, height: 150, objectFit: 'cover' }} />
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {product_id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

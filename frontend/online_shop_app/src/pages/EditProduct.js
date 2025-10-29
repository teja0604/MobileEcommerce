import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(resp.data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare payload with proper types
      const payload = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
        discount: Number(product.discount),
        discountPrice: product.discountPrice != null ? Number(product.discountPrice) : Number(product.price) - (Number(product.price) * (Number(product.discount) / 100.0)),
        isActive: !!product.isActive
      };

      // Send PUT request with JSON body (no image update here)
      await axios.put(`http://localhost:8080/api/products/${id}`, payload);
      alert('Product updated successfully');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      if (err.response) {
        alert(`Failed to update product: ${err.response.data}`);
      } else {
        alert('Failed to update product');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ width: '600px', margin: '20px auto' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label><b>Product Name</b>:</label>
          <input type="text" name="name" value={product.name || ''} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label><b>Price</b>:</label>
          <input type="number" name="price" value={product.price || 0} onChange={handleChange} step="0.01" required />
        </div>
        <br />
        <div>
          <label><b>Description</b>:</label><br />
          <textarea name="description" rows="6" cols="60" maxLength={2000} value={product.description || ''} onChange={handleChange} />
          <div>{(product.description || '').length}/2000</div>
        </div>
        <br />
        <div>
          <label><b>Stock</b>:</label>
          <input type="number" name="stock" value={product.stock || 0} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label><b>Discount</b>:</label>
          <input type="number" name="discount" value={product.discount || 0} onChange={handleChange} required />
        </div>
        <br />
        <div>
          <label><b>Is Active</b>:</label>
          <input type="checkbox" name="isActive" checked={product.isActive === true} onChange={(e) => setProduct({...product, isActive: e.target.checked})} />
        </div>
        <br />
        <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '8px 16px', borderRadius: '6px' }}>Save</button>
        <button type="button" onClick={() => navigate('/admin')} style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;

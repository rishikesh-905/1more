import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductInfoManagement.css';

const ProductInfoManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    supplier: '',
    category: '',
    image: ''
  });
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prevState => ({ ...prevState, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProduct = (product) => {
    const { name, sku, price, stock, supplier, category } = product;
    return name && sku && price && stock && supplier && category;
  };

  const handleAddProduct = async () => {
    if (!validateProduct(newProduct)) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/products', newProduct);
      setProducts(prevProducts => [...prevProducts, response.data]);
      resetForm();
    } catch (error) {
      console.error('Failed to add product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!validateProduct(newProduct)) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3001/products/${editProduct.id}`, newProduct);
      setProducts(prevProducts =>
        prevProducts.map(product => (product.id === editProduct.id ? response.data : product))
      );
      resetForm();
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setNewProduct({
      ...product,
      image: product.image // Preserve image if editing
    });
  };

  const resetForm = () => {
    setEditProduct(null);
    setNewProduct({
      name: '',
      sku: '',
      price: '',
      stock: '',
      supplier: '',
      category: '',
      image: ''
    });
  };

  return (
    <div className="product-info-management">
      <h1>Product Information Management</h1>
      {loading && <div className="loading-spinner">Loading...</div>}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.image && (
              <img src={product.image} alt={product.name} className="product-image" />
            )}
            <div className="product-details">
              <h3>{product.name}</h3>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Supplier:</strong> {product.supplier}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <div className="product-actions">
                <button onClick={() => handleEditClick(product)} className="edit-button">Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="product-form">
        <h2>{editProduct ? 'Update Product' : 'Add New Product'}</h2>
        <form>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
          />
          <input
            type="text"
            name="sku"
            value={newProduct.sku}
            onChange={handleInputChange}
            placeholder="SKU"
            required
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            required
          />
          <input
            type="text"
            name="supplier"
            value={newProduct.supplier}
            onChange={handleInputChange}
            placeholder="Supplier"
            required
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload"
          />
          <button
            type="button"
            onClick={editProduct ? handleUpdateProduct : handleAddProduct}
            className={editProduct ? 'update-button' : 'add-button'}
          >
            {editProduct ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductInfoManagement;

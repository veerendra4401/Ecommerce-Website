import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  if (!product) return (
    <div className="product-details-page">
      <div className="loading">Loading product...</div>
    </div>
  );

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const images = [product.image_url, ...(product.additional_images || [])];

  return (
    <div className="product-details-page">
      <div className="product-container">
        <div className="product-gallery">
          <img 
            src={images[selectedImage]} 
            alt={product.name} 
            className="main-image"
          />
          <div className="thumbnail-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price">₹{product.price}</div>
          
          {product.discount > 0 && (
            <div style={{ 
              color: '#f72585',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              {product.discount}% OFF
            </div>
          )}

          <p className="product-description">{product.description}</p>
          
          <div className="product-meta">
            {product.category && (
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
            )}
            {product.brand && (
              <div className="meta-item">
                <span className="meta-label">Brand:</span>
                <span className="meta-value">{product.brand}</span>
              </div>
            )}
            {product.stock !== undefined && (
              <div className="meta-item">
                <span className="meta-label">Availability:</span>
                <span 
                  className="meta-value" 
                  style={{ 
                    color: product.stock > 0 ? '#4cc9f0' : '#f72585',
                    fontWeight: '600'
                  }}
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            )}
          </div>

          <div className="product-actions">
            <div className="quantity-control">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                min="1"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) setQuantity(Math.max(1, value));
                }}
              />
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>

            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button 
              className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
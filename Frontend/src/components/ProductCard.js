  import React, { useState, useContext } from 'react';
  import { Link } from 'react-router-dom';
  import { FaHeart, FaShoppingCart, FaRegHeart } from 'react-icons/fa';
  import { CartContext } from '../context/CartContext'; // ✅ import context
  import "../styles/ProductCard.css";

  const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { addToCart } = useContext(CartContext); // ✅ get addToCart

    const handleAddToCart = () => {
      addToCart(product);
    };

    return (
      <div className="product-card">
        {product.isNew && <span className="product-card-badge">New</span>}
        {product.discount > 0 && (
          <span className="product-card-badge" style={{ background: '#f72585' }}>
            {product.discount}% OFF
          </span>
        )}
        
        <Link to={`/product/${product.id || product._id}`}>
          <img src={product.image_url} alt={product.name} />
          <div className="product-card-content">
            <h3>{product.name}</h3>
            <div>
              {product.discount > 0 ? (
                <>
                  <span style={{ color: '#f72585', fontWeight: '700' }}>
                    ₹{(product.price - (product.price * product.discount / 100)).toFixed(2)}
                  </span>
                  <span style={{ textDecoration: 'line-through', color: '#adb5bd', marginLeft: '8px', fontSize: '0.9rem' }}>
                    ₹{product.price}
                  </span>
                </>
              ) : (
                <p>₹{product.price}</p>
              )}
            </div>
          </div>
        </Link>
        
        <div className="product-card-actions">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <FaShoppingCart /> Add to Cart
          </button>
          <button 
            className="wishlist-btn"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            {isWishlisted ? <FaHeart style={{ color: '#ff6b6b' }} /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    );
  };

  export default ProductCard;

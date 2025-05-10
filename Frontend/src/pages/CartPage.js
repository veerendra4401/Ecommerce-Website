import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../styles/CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = (subtotal * 0.18).toFixed(2);
  const grandTotal = (parseFloat(subtotal) + parseFloat(tax) + shipping).toFixed(2);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        <span>{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <FaShoppingBag size={64} color="#adb5bd" />
          <p>Your cart is empty</p>
          <Link to="/" className="empty-cart-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => {
              const itemId = item.id || item._id;
              return (
                <div className="cart-item" key={itemId}>
                  <img 
                    src={item.image_url} 
                    alt={item.name} 
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">₹{item.price}</p>
                    
                    <div className="cart-item-controls">
                      <div className="quantity-control">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(itemId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="quantity-input"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => {
                            const qty = parseInt(e.target.value);
                            if (!isNaN(qty) && qty > 0) updateQuantity(itemId, qty);
                          }}
                        />
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(itemId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(itemId)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="cart-summary-row">
              <span>Tax (18%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
          <div className="cart-actions">
            <Link to="/" className="clear-cart-btn">
              <FaArrowLeft /> Continue Shopping
            </Link>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
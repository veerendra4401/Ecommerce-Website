// src/pages/CheckoutPage.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty");

    // Simulate order placement
    console.log("✅ Order Placed", {
      customer: form,
      cart,
    });

    alert("🎉 Order placed successfully!");
    clearCart();
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handlePlaceOrder} className="checkout-form">
        <h3>Personal Information</h3>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />

        <h3>Shipping Address</h3>
        <input name="address" value={form.address} onChange={handleChange} placeholder="Street Address" required />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
        <input name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP Code" required />

        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;

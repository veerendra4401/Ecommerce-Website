import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // ✅ import this

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* ✅ wrap App here */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

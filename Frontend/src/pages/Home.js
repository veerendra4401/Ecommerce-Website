import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data || []);
        setFilteredProducts(res.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let results = products;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(product => 
        product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilter !== 'all') {
      results = results.filter(product => 
        product?.category?.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    
    setFilteredProducts(results);
  }, [searchTerm, activeFilter, products]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'new', name: 'New Arrivals' },
    { id: 'top', name: 'Top Collections' },
    { id: 'sale', name: 'On Sale' },
    // Add more categories as needed
  ];

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">Discover Our Products</h1>
        
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ₹{activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))
        ) : (
          <p className="no-products">No products found. Try a different search or filter.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
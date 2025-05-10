import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;


export const fetchProducts = async () => {
  try {
    const response = await axios.get(`₹{API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

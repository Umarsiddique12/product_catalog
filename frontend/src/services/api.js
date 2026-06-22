import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const fetchProducts = async ({ category, cursor }) => {
  try {
    const params = {};

    if (category && category !== 'All') {
      params.category = category;
    }

    if (cursor) {
      params.cursor = cursor;
    }

    const response = await axios.get(`${API_BASE}/products`, { params });
    
    // Ensure response has expected structure
    if (!response.data) {
      throw new Error('Invalid API response: No data returned');
    }
    
    return {
      products: response.data.products || [],
      nextCursor: response.data.nextCursor || null
    };
  } catch (error) {
    console.error('Failed to fetch products:', error.message);
    // Return empty result instead of crashing
    if (error.response?.status === 503) {
      throw new Error('Backend service is unavailable. Please check if the server is running.');
    }
    throw error;
  }
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${API_BASE}/products`, productData);
  return response.data;
};

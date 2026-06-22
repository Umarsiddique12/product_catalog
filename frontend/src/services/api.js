import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const fetchProducts = async ({ category, cursor }) => {
  const params = {};

  if (category && category !== 'All') {
    params.category = category;
  }

  if (cursor) {
    params.cursor = cursor;
  }

  const response = await axios.get(`${API_BASE}/products`, { params });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${API_BASE}/products`, productData);
  return response.data;
};

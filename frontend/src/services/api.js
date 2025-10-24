// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Dataset APIs
export const uploadDataset = async (formData) => {
  const response = await axios.post(`${API_URL}/api/datasets/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getDatasets = async () => {
  const response = await axios.get(`${API_URL}/api/datasets`);
  return response.data;
};

export const getDataset = async (id, params = {}) => {
  const response = await axios.get(`${API_URL}/api/datasets/${id}`, { params });
  return response.data;
};

export const deleteDataset = async (id) => {
  const response = await axios.delete(`${API_URL}/api/datasets/${id}`);
  return response.data;
};
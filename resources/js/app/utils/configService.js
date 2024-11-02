// src/services/configService.js
import axios from 'axios';

const get = async (url, header) => {

  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching config (GET):', error);
    throw error;
  }
};

const post = async (url, data = {}) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error posting config (POST):', error);
    throw error;
  }
};

const put = async (url, data = {}) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error('Error updating config (PUT):', error);
    throw error;
  }
};

const del = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error('Error deleting config (DELETE):', error);
    throw error;
  }
};

// Exporta todas las funciones
export default {
  get,
  post,
  put,
  delete: del, // Usa `del` para evitar conflictos con la palabra reservada `delete`
};

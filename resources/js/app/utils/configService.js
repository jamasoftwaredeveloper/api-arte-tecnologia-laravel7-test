// src/services/configService.js
import axios from 'axios';

const fetchConfig = async () => {
  try {
    const response = await axios.get('/api/v1/config');
    console.log("response", response);
    
    return response.data; // Devuelve los datos de configuración
  } catch (error) {
    console.error('Error fetching config:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export default fetchConfig;

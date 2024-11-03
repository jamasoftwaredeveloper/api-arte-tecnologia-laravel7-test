// src/services/configService.js
import axios from "axios";
const service = axios.create({
    baseURL: "https://pokeapi.co/api/v2/pokemon", // Asegúrate de que esto esté definido correctamente
    timeout: 10000, // Timeout de la solicitud
});

const get = async (url, header) => {
    try {
        const response = await service.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching config (GET):", error);
        throw error;
    }
};

const post = async (url, data = {}) => {
    try {
        const response = await service.post(url, data);
        return response.data;
    } catch (error) {
        console.error("Error posting config (POST):", error);
        throw error;
    }
};

const put = async (url, data = {}) => {
    try {
        const response = await service.put(url, data);
        return response.data;
    } catch (error) {
        console.error("Error updating config (PUT):", error);
        throw error;
    }
};

const del = async (url) => {
    try {
        const response = await service.delete(url);
        return response.data;
    } catch (error) {
        console.error("Error deleting config (DELETE):", error);
        throw error;
    }
};
const getToken = () => {
    return localStorage.getItem("authToken");
};
const logout = () =>{
  localStorage.removeItem('token');
  router.push({ name: 'login' });
};
// Exporta todas las funciones
export default {
    get,
    post,
    put,
    delete: del, // Usa `del` para evitar conflictos con la palabra reservada `delete`
    getToken,
    logout
};

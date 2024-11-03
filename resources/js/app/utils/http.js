// src/services/configService.js
import axios from "axios";
const service = axios.create({
    baseURL: "http://localhost:8000/", // Asegúrate de que esto esté definido correctamente
    timeout: 10000, // Timeout de la solicitud
});

const get = async (url, header) => {
    try {
        const response = await service.get(url);
        return response.data;
    } catch (error) {
        console.log("Error fetching config (GET):", error);
        throw error;
    }
};

const post = async (url, data = {}) => {
    try {
        const response = await service.post(url, data);
        return response.data;
    } catch (error) {
        console.log("Error posting config (POST):", error);
        throw error;
    }
};

const put = async (url, data = {}) => {
    try {
        const response = await service.put(url, data);
        return response.data;
    } catch (error) {
        console.log("Error updating config (PUT):", error);
        throw error;
    }
};

const del = async (url) => {
    try {
        const response = await service.delete(url);
        return response.data;
    } catch (error) {
        console.log("Error deleting config (DELETE):", error);
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

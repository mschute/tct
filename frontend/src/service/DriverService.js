import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Driver'

const service = {

    getDrivers: async () => {
        try {
            const response = await axios.get(`${API_URL}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching drivers: ${error.message}`);
        }
    },

    getSpecificDriver: async (driverId) => {
        try {
            const response = await axios.get(`${API_URL}/${driverId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching drivers: ${error.message}`);
        }
    },

    createDriver: async (newDriver) => {
        try {
            const response = await axios.post(`${API_URL}`, newDriver)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching drivers: ${error.message}`);
        }
    },

    updateDriver: async (driverId, editingDriver) => {
        try {
            const response = await axios.put(`${API_URL}/${driverId}`, editingDriver)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching drivers: ${error.message}`);
        }
    },

    deleteDriver: async (driverId) => {
        try {
            const response = await axios.delete(`${API_URL}/${driverId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching drivers: ${error.message}`);
        }
    }
}

export default service;
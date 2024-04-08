import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Vehicle'

const service = {

    getVehicles: async () => {
        try {
            const response = await axios.get(`${API_URL}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    },

    getSpecificVehicle: async (vehicleId) => {
        try {
            const response = await axios.get(`${API_URL}/${vehicleId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    },

    createVehicle: async (newVehicle) => {
        try {
            const response = await axios.post(`${API_URL}`, newVehicle)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    },

    updateVehicle: async (vehicleId, editingVehicle) => {
        try {
            const response = await axios.put(`${API_URL}/${vehicleId}`, editingVehicle)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    },

    deleteVehicle: async (vehicleId) => {
        try {
            const response = await axios.delete(`${API_URL}/${vehicleId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    }
}

export default service;
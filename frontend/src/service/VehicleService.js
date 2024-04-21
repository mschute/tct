import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Vehicle'

const service = {

    getVehicles: async (jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    },

    createVehicle: async (newVehicle, jwtToken) => {
        try {
            const response = await axios.post(`${API_URL}`, newVehicle, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    },

    updateVehicle: async (vehicleId, editingVehicle, jwtToken) => {
        try {
            const response = await axios.put(`${API_URL}/${vehicleId}`, editingVehicle, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    },

    deleteVehicle: async (vehicleId, jwtToken) => {
        try {
            const response = await axios.delete(`${API_URL}/${vehicleId}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching vehicles: ${error.message}`);
        }
    }
}

export default service;
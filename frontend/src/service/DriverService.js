import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Driver'

const service = {

    getDrivers: async (jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}`, {headers: {Authorization: `Bearer ${jwtToken}`}});

            return response.data;
        } catch (error) {
            throw new Error(`Error fetching drivers: ${error.message}`);
        }
    },

    createDriver: async (newDriver, jwtToken) => {
        try {
            const response = await axios.post(`${API_URL}`, newDriver, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching drivers: ${error.message}`);
        }
    },

    updateDriver: async (driverId, editingDriver, jwtToken) => {
        try {
            const response = await axios.put(`${API_URL}/${driverId}`, editingDriver, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching drivers: ${error.message}`);
        }
    },

    deleteDriver: async (driverId, jwtToken) => {
        try {
            const response = await axios.delete(`${API_URL}/${driverId}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching drivers: ${error.message}`);
        }
    }
}

export default service;
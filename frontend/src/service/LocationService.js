import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Location'

const service = {

    getLocations: async () => {
        try {
            const response = await axios.get(`${API_URL}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    },

    createLocation: async (newLocation, jwtToken) => {
        try {
            const response = await axios.post(`${API_URL}`, newLocation, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    },

    updateLocation: async (locationId, editingLocation, jwtToken) => {
        try {
            const response = await axios.put(`${API_URL}/${locationId}`, editingLocation, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    },

    deleteLocation: async (locationId, jwtToken) => {
        try {
            const response = await axios.delete(`${API_URL}/${locationId}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    }
}

export default service;
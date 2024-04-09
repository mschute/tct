import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Location'

const service = {

    getLocations: async () => {
        try {
            const response = await axios.get(`${API_URL}`)
            console.log(`This is the locations: ${JSON.stringify(response.data)}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    },

    getSpecificLocation: async (locationId) => {
        try {
            const response = await axios.get(`${API_URL}/${locationId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    },

    createLocation: async (newLocation) => {
        try {
            const response = await axios.post(`${API_URL}`, newLocation)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    },

    updateLocation: async (locationId, editingLocation) => {
        try {
            const response = await axios.put(`${API_URL}/${locationId}`, editingLocation)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    },

    deleteLocation: async (locationId) => {
        try {
            const response = await axios.delete(`${API_URL}/${locationId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching locations: ${error.message}`);
        }
    }
}

export default service;
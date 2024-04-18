import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Itinerary'

const service = {

    getItineraries: async () => {
        try {
            const response = await axios.get(`${API_URL}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itineraries: ${error.message}`);
        }
    },

    getSpecificItinerary: async (itineraryId) => {
        try {
            const response = await axios.get(`${API_URL}/${itineraryId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itineraries: ${error.message}`);
        }
    },

    createItinerary: async (newItinerary) => {
        try {
            const response = await axios.post(`${API_URL}`, newItinerary)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itineraries: ${error.message}`);
        }
    },

    updateItinerary: async (itineraryId, editingItinerary) => {
        try {
            const response = await axios.put(`${API_URL}/${itineraryId}`, editingItinerary)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itineraries: ${error.message}`);
        }
    },

    deleteItinerary: async (itineraryId) => {
        try {
            const response = await axios.delete(`${API_URL}/${itineraryId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itineraries: ${error.message}`);
        }
    }
}

export default service;
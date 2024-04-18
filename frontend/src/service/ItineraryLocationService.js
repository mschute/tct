import axios from 'axios';

const API_URL = 'http://localhost:5255/api/ItineraryLocation'

const service = {

    getItineraryLocations: async () => {
        try {
            const response = await axios.get(`${API_URL}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itinerary locations: ${error.message}`);
        }
    },

    // getSpecificItineraryLocation: async (itineraryId, locationId) => {
    //     try {
    //         const response = await axios.get(`${API_URL}/${itineraryId}/${locationId}`)
    //         return response.data;
    //     } catch (error) {
    //         throw new Error(`Error fetching bookings: ${error.message}`);
    //     }
    // },

    getSpecificItineraryLocation: async (itineraryId) => {
        try {
            const response = await axios.get(`${API_URL}/${itineraryId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itinerary locations: ${error.message}`);
        }
    },

    // GetBookingLocationsByItineraryId: async (itineraryId) => {
    //     try {
    //         const response = await axios.get(`${API_URL}/${itineraryId}`)
    //         return response.data;
    //     } catch (error) {
    //         throw new Error(`Error fetching itineraries: ${error.message}`);
    //     }
    // },

    createItineraryLocation: async (newItineraryLocation) => {
        try {
            const response = await axios.post(`${API_URL}`, newItineraryLocation)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itinerary locations: ${error.message}`);
        }
    },

    updateItineraryLocation: async (itineraryId, locationId, editingItineraryLocation) => {
        try {
            const response = await axios.put(`${API_URL}/${itineraryId}/${locationId}`, editingItineraryLocation)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itinerary locations: ${error.message}`);
        }
    },

    deleteItineraryLocation: async (itineraryId, locationId) => {
        try {
            const response = await axios.delete(`${API_URL}/${itineraryId}/${locationId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itinerary locations: ${error.message}`);
        }
    }
}

export default service;
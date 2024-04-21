import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Itinerary'

const service = {

    getItineraries: async (jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itineraries: ${error.message}`);
        }
    },

    getItinerariesByCustomer: async (customerId, jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}/ByCustomer/${customerId}`, {
                headers: {Authorization: `Bearer ${jwtToken}`}
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itineraries: ${error.message}`);
        }
    },

    createItinerary: async (newItinerary, jwtToken) => {
        console.log("The create itinerary form was called:", JSON.stringify(newItinerary))
        try {
            const response = await axios.post(`${API_URL}`, newItinerary, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itineraries: ${error.message}`);
        }
    },

    deleteItinerary: async (itineraryId, jwtToken) => {
        console.log("This is jwt token", JSON.stringify(jwtToken))
        try {
            const response = await axios.delete(`${API_URL}/${itineraryId}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching itineraries: ${error.message}`);
        }
    }
}

export default service;
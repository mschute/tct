import axios from 'axios';

const API_URL = 'http://localhost:5255/api/BookingLocation'

const service = {

    getSpecificBookingLocation: async (bookingId, jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}/${bookingId}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    createBookingLocation: async (newBookingLocation, jwtToken) => {
        try {
            const response = await axios.post(`${API_URL}`, newBookingLocation, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },
    
    deleteBookingLocation: async (bookingId, locationId, jwtToken) => {
        try {
            const response = await axios.delete(`${API_URL}/${bookingId}/${locationId}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    }
}

export default service;
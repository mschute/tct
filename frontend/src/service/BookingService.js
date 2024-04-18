import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Booking'

const service = {

    getBookings: async (userRole) => {
        try {
            const response = await axios.get(`${API_URL}`, {
                headers: {
                    'Authorization': `Bearer ${userRole}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    getSpecificBooking: async (bookingId) => {
        try {
            const response = await axios.get(`${API_URL}/${bookingId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    createBooking: async (newBooking) => {
        try {
            const response = await axios.post(`${API_URL}`, newBooking)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    updateBooking: async (bookingId, editingBooking) => {
        try {
            const response = await axios.put(`${API_URL}/${bookingId}`, editingBooking)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    deleteBooking: async (bookingId) => {
        try {
            const response = await axios.delete(`${API_URL}/${bookingId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    }
}

export default service;
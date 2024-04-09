import axios from 'axios';

const API_URL = 'http://localhost:5255/api/BookingLocation'

const service = {

    getBookingLocations: async () => {
        try {
            const response = await axios.get(`${API_URL}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    // getSpecificBookingLocation: async (bookingId, locationId) => {
    //     try {
    //         const response = await axios.get(`${API_URL}/${bookingId}/${locationId}`)
    //         return response.data;
    //     } catch (error) {
    //         throw new Error(`Error fetching bookings: ${error.message}`);
    //     }
    // },

    getSpecificBookingLocation: async (bookingId) => {
        try {
            const response = await axios.get(`${API_URL}/${bookingId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    // GetBookingLocationsByBookingId: async (bookingId) => {
    //     try {
    //         const response = await axios.get(`${API_URL}/${bookingId}`)
    //         return response.data;
    //     } catch (error) {
    //         throw new Error(`Error fetching bookings: ${error.message}`);
    //     }
    // },

    createBookingLocation: async (newBookingLocation) => {
        try {
            const response = await axios.post(`${API_URL}`, newBookingLocation)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    updateBookingLocation: async (bookingId, locationId, editingBookingLocation) => {
        try {
            const response = await axios.put(`${API_URL}/${bookingId}/${locationId}`, editingBookingLocation)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    deleteBookingLocation: async (bookingId, locationId) => {
        try {
            const response = await axios.delete(`${API_URL}/${bookingId/locationId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    }
}

export default service;
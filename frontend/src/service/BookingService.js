import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Booking'

const service = {

    getBookings: async (jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}`, {headers: {Authorization: `Bearer ${jwtToken}`}});
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    getSpecificBooking: async (bookingId, jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}/${bookingId}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    getBookingsByCustomer: async (customerId, jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}/booking/ByCustomer/${customerId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings by customer ID: ${error.message}`);
        }
    },

    createBooking: async (newBooking, jwtToken) => {
        console.log("Create booking data ", JSON.stringify(newBooking));
        try {
            const response = await axios.post(`${API_URL}`, newBooking, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    updateBooking: async (bookingId, editingBooking, jwtToken) => {
        console.log("update booking data ", JSON.stringify(editingBooking));
        console.log("update booking id", JSON.stringify(bookingId));
        try {
            const response = await axios.put(`${API_URL}/${bookingId}`, editingBooking, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },

    deleteBooking: async (bookingId, jwtToken) => {
        console.log("Delete booking ID", JSON.stringify(bookingId))
        try {
            const response = await axios.delete(`${API_URL}/${bookingId}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching bookings: ${error.message}`);
        }
    },
}

export default service;
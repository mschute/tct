import axios from 'axios';

const API_URL = 'http://localhost:5255/api/account'

const service = {

    register: async () => {
        try {
            const response = await axios.get(`${API_URL}/register`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    },

    getSpecificCustomer: async (customerId) => {
        try {
            const response = await axios.get(`${API_URL}/${customerId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    },

    createCustomer: async (newCustomer) => {
        try {
            const response = await axios.post(`${API_URL}`, newCustomer)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    },

    updateCustomer: async (customerId, editingCustomer) => {
        try {
            const response = await axios.put(`${API_URL}/${customerId}`, editingCustomer)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    },

    deleteCustomer: async (customerId) => {
        try {
            const response = await axios.delete(`${API_URL}/${customerId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    }
}

export default service;
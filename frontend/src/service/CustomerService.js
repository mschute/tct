import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Customer'

const service = {

    getCustomers: async (jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    },

    getSpecificCustomer: async (customerId, jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}/${customerId}`,{headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching specific customer: ${error.message}`);
        }
    },

    createCustomer: async (newCustomer, jwtToken) => {
        try {
            const response = await axios.post(`${API_URL}`, newCustomer, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    },

    updateCustomer: async (customerId, editingCustomer, jwtToken) => {
        try {
            const response = await axios.put(`${API_URL}/${customerId}`, editingCustomer, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    },

    deleteCustomer: async (customerId, jwtToken) => {
        try {
            const response = await axios.delete(`${API_URL}/${customerId}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching customers: ${error.message}`);
        }
    }
}

export default service;
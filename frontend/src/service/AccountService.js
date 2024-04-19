import axios from 'axios';

const API_URL = 'http://localhost:5255/api/account'

const service = {

    register: async (userData) => {
        console.log("Register was called")
        console.log("This is user data", JSON.stringify(userData))
        try {
            const response = await axios.post(`${API_URL}/register`, userData)
            return response.data;
        } catch (error) {
            throw new Error(`Error registering user: ${error.response.data.message}`);
        }
    },

    login: async (credentials) => {
        console.log("Login was called")
        try {
            const response = await axios.post(`${API_URL}/login`, credentials)
            return response.data;
        } catch (error) {
            throw new Error(`Error signing in: ${error.message}`);
        }
    },

    logout: async () => {
        try {
            const response = await axios.post(`${API_URL}/logout`)
            return response.data;
        } catch (error) {
            throw new Error(`Error signing out: ${error.message}`);
        }
    },
}

export default service;
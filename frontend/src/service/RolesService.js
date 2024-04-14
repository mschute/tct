import axios from 'axios';

const API_URL = 'http://localhost:5255/api/account'

const service = {

    getRoles: async () => {
        try {
            const response = await axios.post(`${API_URL}/roles`)
            return response.data;
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    },

    getSpecificRole: async (roleId) => {
        try {
            const response = await axios.get(`${API_URL}/roles/{roleId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error signing in: ${error.message}`);
        }
    },

//TODO Create postRole, PutRole, DeleteRole, Assign Role to Specific User
}

export default service;
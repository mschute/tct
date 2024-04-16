import axios from 'axios';

const API_URL = 'http://localhost:5255/api/User'

const service = {

    getUsers: async () => {
        try {
            const response = await axios.get(`${API_URL}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    }
}
export default service;
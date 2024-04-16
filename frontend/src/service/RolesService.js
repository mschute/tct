import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Roles'

const service = {

    getRoles: async () => {
        try {
            const response = await axios.get(`${API_URL}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    },

    getSpecificRole: async (roleId) => {
        try {
            const response = await axios.get(`${API_URL}/${roleId}`)
            return response.data;
        } catch (error) {
            throw new Error(`Error signing in: ${error.message}`);
        }
    },

    createRole: async (newRoleName) => {
        try {
            const response = await axios.post(`${API_URL}`, newRoleName, {
                headers: {
                    'Content-Type': 'application/json'
                }})
            return response.data;
        } catch (error) {
            throw new Error(`Error creating role: ${error.message}`);
        }
    },
    
//TODO Believe this is wrong
    updateRole: async (roleModel) => {
        try {
            const response = await axios.post(`${API_URL}`, roleModel)
            return response.data;
        } catch (error) {
            throw new Error(`Error updating role: ${error.message}`);
        }
    },

    deleteRole: async (roleId) => {
        try {
            const response = await axios.delete(`${API_URL}/${roleId}`, roleId)
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting role: ${error.message}`);
        }
    },

    //TODO Believe this will have an error as it needs UserID and RoleName
    assignRoleToUser: async (roleModel) => {
        try {
            const response = await axios.post(`${API_URL}`, roleModel)
            return response.data;
        } catch (error) {
            throw new Error(`Error signing in: ${error.message}`);
        }
    },
}

export default service;
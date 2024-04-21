import axios from 'axios';

const API_URL = 'http://localhost:5255/api/Roles'

const service = {

    getRoles: async (jwtToken) => {
        try {
            const response = await axios.get(`${API_URL}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error registering user: ${error.message}`);
        }
    },

    createRole: async (newRoleName, jwtToken) => {
        try {
            const response = await axios.post(`${API_URL}`, newRoleName, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            return response.data;
        } catch (error) {
            throw new Error(`Error creating role: ${error.message}`);
        }
    },

    updateRole: async (roleModel, jwtToken) => {
        try {
            const response = await axios.post(`${API_URL}`, roleModel, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error updating role: ${error.message}`);
        }
    },

    deleteRole: async (roleId, jwtToken) => {
        try {
            const response = await axios.delete(`${API_URL}/${roleId}`, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting role: ${error.message}`);
        }
    },

    assignRoleToUser: async (roleModel, jwtToken) => {
        try {
            const response = await axios.post(`${API_URL}/assign-role-to-user`, roleModel, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error signing in: ${error.message}`);
        }
    },

    updateUserRole: async (roleModel, jwtToken) => {
        try {
            const response = await axios.put(`${API_URL}/update-role-assignment`, roleModel, {headers: {Authorization: `Bearer ${jwtToken}`}})
            return response.data;
        } catch (error) {
            throw new Error(`Error signing in: ${error.message}`);
        }
    },
}

export default service;
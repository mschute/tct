import React, { useState, useEffect } from 'react';
import service from '../service/UserService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";
import "../styles/table.css";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const modelName = "User";

    useEffect(() => {
        // Fetch users data when component mounts
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersData = await service.getUsers();
            setUsers(usersData);
        } catch (error) {
            console.error(error.message)
        }
    }

    // const handleEdit = (userId) => {
    //     console.log('Edit button clicked for user userId:', userId);
    //     const selected = users.find((user) => user.userId === userId);
    //     console.log('Selected user:', selected);
    //     setSelectedUser(null);
    //
    //     // Ensure that the property names match the expected format
    //     setEditingUser({ userId: selected.userId, firstName: selected.firstName, lastName: selected.lastName, dob: selected.dob, nationality: selected.nationality});
    // };

    // const handleDelete = async (userId) => {
    //     try {
    //         await service.deleteUser(userId)
    //         fetchUsers();
    //     } catch (error) {
    //         console.error('Error deleting user:', error);
    //     }
    // };

    // const handleViewDetails = (userId) => {
    //     const selected = users.find((user) => user.userId === userId);
    //     setSelectedUser(selected);
    //     setEditingUser(null);
    // };

    // const handleCreate = () => {
    //     setSelectedUser(null);
    //     setEditingUser({ firstName: '', lastName: '', dob: '', nationality: '' });
    // };

    // const handleCancelEdit = () => {
    //     setEditingUser(null);
    // };

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         console.log('Editing User:', editingUser);
    //
    //         if (editingUser) {
    //             if (editingUser.userId) {
    //                 console.log('Updating existing user:', editingUser);
    //                 await service.updateUser(editingUser.userId, editingUser);
    //
    //             } else {
    //                 // Remove the existing userId property for new users
    //                 const { userId, ...newUser } = editingUser;
    //                 console.log('Creating new user:', newUser);
    //                 await service.createUser(newUser)
    //             }
    //             fetchUsers();
    //         }
    //     } catch (error) {
    //         console.error('Error saving user:', error);
    //         console.error('Response data:', error.response?.data);
    //     } finally {
    //         setEditingUser(null);
    //     }
    // };

    return (
        <div>
            <List model={users} modelName={modelName} />
            {selectedUser && <Details model={selectedUser} modelName={modelName} />}
        </div>
    );
};

export default Users;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig.js';
import CustomersForm from "./CustomersForm";
import CustomersList from "./CustomersList";
import CustomersDetails from "./CustomersDetails";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {
        // Fetch customers data when component mounts
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}Customer`);
            console.log("This is the response for fetch customer: " + response)
            setCustomers(response.data);
            setSelectedCustomer(null);
            setEditingCustomer(null);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleEdit = (id) => {
        console.log('Edit button clicked for customer id:', id);
        const selected = customers.find((customer) => customer.id === id);
        console.log('Selected customer:', selected);
        setSelectedCustomer(null);

        // Ensure that the property names match the expected format
        setEditingCustomer({ id: selected.id, firstName: selected.firstName, lastName: selected.lastName, dob: selected.dob, nationality: selected.nationality});
    };
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}Customer/${id}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleViewDetails = (id) => {
        const selected = customers.find((customer) => customer.id === id);
        setSelectedCustomer(selected);
        setEditingCustomer(null);
    };

    const handleCreate = () => {
        setSelectedCustomer(null);
        setEditingCustomer({ firstName: '', lastName: '', dob: '', nationality: '' });
    };

    const handleCancelEdit = () => {
        setEditingCustomer(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Customer:', editingCustomer);

            if (editingCustomer) {
                if (editingCustomer.id) {
                    console.log('Updating existing customer:', editingCustomer);
                    await axios.put(`${API_BASE_URL}Customer/${editingCustomer.id}`, editingCustomer);

                } else {
                    // Remove the existing id property for new customers
                    const { id, ...newCustomer } = editingCustomer;
                    console.log('Creating new customer:', newCustomer);
                    await axios.post(`${API_BASE_URL}Customer`, newCustomer);
                }
                fetchCustomers();
            }
        } catch (error) {
            console.error('Error saving customer:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingCustomer(null);
        }
    };
    
    return (
        <div>
            <CustomersList customers={customers} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedCustomer && <CustomersDetails customer={selectedCustomer} />}
            {editingCustomer && (
                <CustomersForm
                    customer={editingCustomer}
                    handleInputChange={(e) => setEditingCustomer({ ...editingCustomer, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            <button onClick={handleCreate}>Create New Customer</button>
        </div>
    );
};

export default Customers;
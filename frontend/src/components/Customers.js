import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig.js';
import service from '../service/CustomerService'; 
import List from "./List";
import Form from "./Form";
import Details from "./Details";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const modelName = "Customer";

    useEffect(() => {
        // Fetch customers data when component mounts
        fetchCustomers();
    }, []);

    // const fetchCustomers = async () => {
    //     try {
    //         const response = await axios.get(`${API_BASE_URL}Customer`);
    //         console.log("This is the response for fetch customer: " + response)
    //         setCustomers(response.data);
    //         setSelectedCustomer(null);
    //         setEditingCustomer(null);
    //     } catch (error) {
    //         console.error('Error fetching customers:', error);
    //     }
    // };
    
    const fetchCustomers = async () => {
        try {
            const customersData = await service.getCustomers();
            setCustomers(customersData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (customerId) => {
        console.log('Edit button clicked for customer customerId:', customerId);
        const selected = customers.find((customer) => customer.customerId === customerId);
        console.log('Selected customer:', selected);
        setSelectedCustomer(null);

        // Ensure that the property names match the expected format
        setEditingCustomer({ customerId: selected.customerId, firstName: selected.firstName, lastName: selected.lastName, dob: selected.dob, nationality: selected.nationality});
    };
    
    const handleDelete = async (customerId) => {
        try {
            await service.deleteCustomer(customerId)
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleViewDetails = (customerId) => {
        const selected = customers.find((customer) => customer.customerId === customerId);
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
                if (editingCustomer.customerId) {
                    console.log('Updating existing customer:', editingCustomer);
                    await service.updateCustomer(editingCustomer.customerId, editingCustomer);

                } else {
                    // Remove the existing customerId property for new customers
                    const { customerId, ...newCustomer } = editingCustomer;
                    console.log('Creating new customer:', newCustomer);
                    await service.createCustomer(newCustomer)
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
            <List model={customers} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedCustomer && <Details model={selectedCustomer} modelName={modelName} />}
            {editingCustomer && (
                <Form
                    model={editingCustomer}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingCustomer({ ...editingCustomer, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            <button onClick={handleCreate}>Add new</button>
        </div>
    );
};

export default Customers;
import React, { useState, useEffect } from 'react';
import service from '../service/CustomerService'; 
import List from "./List";
import Form from "./Form";
import Details from "./Details";
import "../styles/table.css";

const Customers = ({jwtToken}) => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const modelName = "Customer";

    useEffect(() => {
        // Fetch customers data when component mounts
        fetchCustomers(jwtToken);
    }, []);
    
    const fetchCustomers = async () => {
        try {
            const customersData = await service.getCustomers(jwtToken);
            setCustomers(customersData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (customerId) => {
        const selected = customers.find((customer) => customer.customerId === customerId);
        setSelectedCustomer(null);
        
        setEditingCustomer({ customerId: selected.customerId, firstName: selected.firstName, lastName: selected.lastName, dob: selected.dob, nationality: selected.nationality, userId: selected.userId});
    };
    
    const handleDelete = async (customerId) => {
        try {
            await service.deleteCustomer(customerId, jwtToken)
            fetchCustomers(jwtToken);
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
        setIsFormOpen(true);
    };

    const handleCancelEdit = () => {
        setEditingCustomer(null);
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Customer:', editingCustomer);

            if (editingCustomer) {
                if (editingCustomer.customerId) {
                    await service.updateCustomer(editingCustomer.customerId, editingCustomer, jwtToken);

                } else {
                    const { customerId, ...newCustomer } = editingCustomer;
                    await service.createCustomer(newCustomer, jwtToken)
                }
                fetchCustomers();
            }
        } catch (error) {
            console.error('Error saving customer:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingCustomer(null);
            setIsFormOpen(false);
        }
    };
    
    return (
        <div>
            <List model={customers} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedCustomer && <Details model={selectedCustomer} modelName={modelName} />}
            {editingCustomer && (
                <Form
                    fields={[
                        {name:"customerId", label:"Customer ID", value:editingCustomer.customerId, type:"text", disabled:true},
                        {name:"firstName", label:"First Name", value:editingCustomer.firstName, type:"text", disabled:false},
                        {name:"lastName", label:"Last Name", value:editingCustomer.lastName, type:"text", disabled:false},
                        {name:"dob", label:"Date of Birth", value:editingCustomer.dob, type:"date", disabled:false},
                        {name:"nationality", label:"Nationality", value:editingCustomer.nationality, type:"text", disabled:false},
                        {name:"userId", label:"User ID", value:editingCustomer.userId, type:"text", disabled:true},
                    ]}
                    model={editingCustomer}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingCustomer({ ...editingCustomer, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            {/*{isFormOpen===true ? "" : (<button className="primary-button" onClick={handleCreate}>Add new</button>)}*/}

        </div>
    );
};

export default Customers;
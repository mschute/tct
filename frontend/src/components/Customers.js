import React, {useState, useEffect} from 'react';
import service from '../service/CustomerService';
import List from "./List";
import Form from "./Form";
import "../styles/table.css";
import {validateDOB, validateWord} from "../helpers/validation";

const Customers = ({jwtToken}) => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const modelName = "Customer";

    useEffect(() => {
        fetchCustomers(jwtToken);
    }, []);

    const clearErrorMessage = () => {
        setErrorMessage('');
    }
    const fetchCustomers = async () => {
        try {
            const customersData = await service.getCustomers(jwtToken);
            setCustomers(customersData);
            clearErrorMessage();
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (customerId) => {
        const selected = customers.find((customer) => customer.customerId === customerId);
        setSelectedCustomer(null);

        setEditingCustomer({
            customerId: selected.customerId,
            firstName: selected.firstName,
            lastName: selected.lastName,
            dob: selected.dob,
            nationality: selected.nationality,
            userId: selected.userId
        });
    };

    const handleDelete = async (customerId) => {
        try {
            await service.deleteCustomer(customerId, jwtToken)
            fetchCustomers(jwtToken);
        } catch (error) {
            setErrorMessage('Error deleting customer. Please try again.');
        }
    };

    const handleCancelEdit = () => {
        setEditingCustomer(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            clearErrorMessage();

            if (editingCustomer) {
                let error = validateWord("First Name", editingCustomer.firstName);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }

                error = validateWord("Last Name", editingCustomer.lastName);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }

                error = validateDOB("Date of Birth", editingCustomer.dob);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }

                error = validateWord("Nationality", editingCustomer.nationality);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                if (editingCustomer.customerId) {
                    await service.updateCustomer(editingCustomer.customerId, editingCustomer, jwtToken);

                } else {
                    const {customerId, ...newCustomer} = editingCustomer;
                    await service.createCustomer(newCustomer, jwtToken)
                }
                await fetchCustomers();
                setEditingCustomer(null);
            }
        } catch (error) {
            setErrorMessage('Error saving customer. Please try again');
            console.error('Response data:', error.response?.data);
        }
    };

    return (
        <div>
            <List model={customers} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete}/>
            {editingCustomer && (
                <Form
                    fields={[
                        {
                            name: "customerId",
                            label: "Customer ID",
                            value: editingCustomer.customerId,
                            type: "text",
                            disabled: true
                        },
                        {
                            name: "firstName",
                            label: "First Name",
                            value: editingCustomer.firstName,
                            type: "text",
                            disabled: false
                        },
                        {
                            name: "lastName",
                            label: "Last Name",
                            value: editingCustomer.lastName,
                            type: "text",
                            disabled: false
                        },
                        {
                            name: "dob",
                            label: "Date of Birth",
                            value: editingCustomer.dob,
                            type: "date",
                            disabled: false
                        },
                        {
                            name: "nationality",
                            label: "Nationality",
                            value: editingCustomer.nationality,
                            type: "text",
                            disabled: false
                        },
                        {name: "userId", label: "User ID", value: editingCustomer.userId, type: "text", disabled: true},
                    ]}
                    model={editingCustomer}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingCustomer({...editingCustomer, [e.target.name]: e.target.value})}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default Customers;
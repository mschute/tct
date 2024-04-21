import React, {useState, useEffect} from 'react';
import service from '../service/CustomerService';
import List from "./List";
import Form from "./Form";
import "../styles/table.css";

const Customers = ({jwtToken}) => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const modelName = "Customer";

    useEffect(() => {
        fetchCustomers(jwtToken);
    }, []);

    const fetchCustomers = async () => {
        try {
            const customersData = await service.getCustomers(jwtToken);
            setCustomers(customersData);
            clearErrorMessage();
        } catch (error) {
            console.error(error.message)
        }
    }

    const clearErrorMessage = () => {
        setErrorMessage('');
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
            console.log('Editing Customer:', editingCustomer);

            if (editingCustomer) {
                if (editingCustomer.customerId) {
                    await service.updateCustomer(editingCustomer.customerId, editingCustomer, jwtToken);

                } else {
                    const {customerId, ...newCustomer} = editingCustomer;
                    await service.createCustomer(newCustomer, jwtToken)
                }
                fetchCustomers();
            }
        } catch (error) {
            setErrorMessage('Error saving customer. Please try again');
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingCustomer(null);
        }
    };

    return (
        <div>
            <List model={customers} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete}/>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
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
        </div>
    );
};

export default Customers;
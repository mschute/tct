import React, {useState, useEffect} from 'react';
import service from '../service/CustomerService';
import Form from "./Form";
import "../styles/table.css";
import ViewList from "./ViewList";

const CustomerSpecific = ({jwtToken, activeCustomerId}) => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const modelName = "Customer";

    useEffect(() => {
        fetchCustomer(activeCustomerId, jwtToken);
    }, []);

    const fetchCustomer = async () => {
        try {
            const customersData = await service.getSpecificCustomer(activeCustomerId, jwtToken);
            setCustomers(customersData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (customerId) => {
        if (customers.customerId === customerId) {
            setSelectedCustomer(null);

            setEditingCustomer({
                customerId: customers.customerId,
                firstName: customers.firstName,
                lastName: customers.lastName,
                dob: customers.dob,
                nationality: customers.nationality,
                userId: customers.userId
            });
            console.log("Customer's userId", customers.userId)
        } else {
            console.error('Customer not found: ', customerId)
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
                    console.log('Updating existing customer:', editingCustomer);
                    await service.updateCustomer(editingCustomer.customerId, editingCustomer, jwtToken);

                }
                fetchCustomer();
            }
        } catch (error) {
            setErrorMessage('Error saving customer. Please try again.');
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingCustomer(null);
        }
    };

    return (
        <div>
            <ViewList model={customers} modelName={modelName} handleEdit={handleEdit}/>
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
                        {name: "userId", type: "hidden", value: editingCustomer.userId}
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

export default CustomerSpecific;
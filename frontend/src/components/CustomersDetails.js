import React from 'react';

const CustomersDetails = ({ customer }) => {
    if (!customer) {
        return <div>No customer selected.</div>;
    }

    return (
        <div>
            <h2>Customer Details</h2>
            <p>ID: {customer.customerId}</p>
            <p>First Name: {customer.firstName}</p>
            <p>Last Name: {customer.lastName}</p>
            <p>Dob: {customer.dob}</p>
            <p>Nationality: {customer.nationality}</p>
        </div>
    );
};

export default CustomersDetails;
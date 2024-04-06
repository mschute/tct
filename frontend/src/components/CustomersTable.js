import React from 'react';

const CustomersTable = ({ customers, handleEdit, handleDelete }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Nationality</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => (
                <tr key={customer.customerId}>
                    <td>{customer.customerId}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.dob}</td>
                    <td>{customer.nationality}</td>
                    <td>
                        <button onClick={() => handleEdit(customer.customerId)}>Edit</button>
                        <button onClick={() => handleDelete(customer.customerId)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CustomersTable;
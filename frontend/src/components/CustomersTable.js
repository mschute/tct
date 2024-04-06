import React from 'react';

const CustomersTable = ({ customers, handleEdit, handleDelete }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Dob</th>
                <th>Nationality</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => (
                <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.dob}</td>
                    <td>{customer.nationality}</td>
                    <td>
                        <button onClick={() => handleEdit(customer.CustomerId)}>Edit</button>
                        <button onClick={() => handleDelete(customer.CustomerId)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CustomersTable;
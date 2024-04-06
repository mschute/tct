import React from 'react';
import CustomersTable from './CustomersTable';

const CustomersList = ({ customers, handleEdit, handleDelete }) => {
    return (
        <div>
            <h2>Customers</h2>
            <CustomersTable customers={customers} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    );
};

export default CustomersList;
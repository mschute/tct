import React from 'react';
import Table from './Table';
import CustomersTable from './CustomersTable';

const List = ({ model, handleEdit, handleDelete }) => {
    return (
        <div>
            <h2>{typeof(model)}</h2>
            <Table model={model} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    );
};

export default List;
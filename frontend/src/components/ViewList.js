import React from 'react';
import ViewTable from './ViewTable';

const ViewList = ({ model, modelName, handleEdit, handleDelete}) => {
    return (
        <div>
            <h2>{modelName}</h2>
            <ViewTable model={model} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete}/>
        </div>
    );
};

export default ViewList;
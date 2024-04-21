import React from 'react';
import Table from './Table';

const List = ({model, modelName, handleEdit, handleDelete}) => {
    return (
        <div>
            <h2>{modelName}</h2>
            <Table model={model} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete}/>
        </div>
    );
};

export default List;
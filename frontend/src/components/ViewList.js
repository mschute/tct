import React from 'react';
import ViewTable from './ViewTable';

const List = ({ model, modelName }) => {
    return (
        <div>
            <h2>{modelName}</h2>
            <ViewTable model={model} />
        </div>
    );
};

export default List;
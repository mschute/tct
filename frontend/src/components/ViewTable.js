import React from 'react';
import {formatCamelCase} from "../helpers/helpers";
import "../styles/table.css";

const ViewTable = ({model, modelName, handleEdit, handleDelete}) => {
    if (!model || model.length === 0) {
        return <div>No data available.</div>
    }

    const attributeNames = Object.keys(model);

    return (
        <div className='table-container'>
            <table className='table'>
                <thead>
                <tr>
                    {attributeNames.map((attributeName, index) => (
                        attributeName !== "userId" &&
                        <th key={index}>{formatCamelCase(attributeName)}</th>
                    ))}
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {attributeNames.map((attributeName, colIndex) => (
                        attributeName !== "userId" &&
                        <td key={colIndex}>{model[attributeName]}</td>
                    ))}
                    <td>
                        {modelName === "Customer" ? (
                            <button className='primary-button'
                                    onClick={() => handleEdit(Object.values(model)[0])}>Edit</button>
                        ) : (<button className='primary-button'
                                     onClick={() => handleDelete(attributeNames)}>Delete</button>)}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ViewTable;
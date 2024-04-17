import React from 'react';
import {formatCamelCase} from "../helpers/helpers";
import "../styles/table.css";

const Table = ({model, modelName, handleEdit, handleDelete}) => {
    if (!model || model.length === 0) {
        return <div>No data available.</div>
    }

    const attributeNames = Object.keys(model[0]);
    console.log(attributeNames);

    return (
        <div className='table-container'>
            <table className='table'>
                <thead>
                <tr>
                    {attributeNames.map((attributeName, index) => (
                        <th key={index}>{formatCamelCase(attributeName)}</th>
                    ))}
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {model.map((entry, rowIndex) => (
                    <tr key={rowIndex}>
                        {attributeNames.map((attributeName, colIndex) => (
                            <td key={colIndex}>
                                {Array.isArray(entry[attributeName]) ? (
                                    entry[attributeName].map((item, index) => (
                                        <div key={index}>{item}</div>
                                    ))
                                ) : (
                                    entry[attributeName]
                                )}
                            </td>
                        ))}
                        <td>
                            {modelName === "User" ? (
                                <button className='primary-button'
                                        onClick={() => handleEdit(entry[attributeNames[0]])}>Edit Role</button>
                            ) : (<button className='primary-button'
                                         onClick={() => handleEdit(entry[attributeNames[0]])}>Edit</button>)}
                            {modelName === "User" ?
                                ("") : (<button className="delete-button"
                                                onClick={() => handleDelete(entry[attributeNames[0]])}>Delete</button>)
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
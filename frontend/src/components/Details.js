import React from 'react';

const Details = ({ model }) => {
    if (!model) {
        return <div>No {typeof(model)} selected.</div>;
    }

    return (
        <div>
            <h2>{typeof(model)} Details</h2>
            {model.entries(model).map(([key, value]) => (
                <div key={key}>
                    <p>{key}: {value}</p>
                </div>
            ))}
        </div>
    );
};

export default Details;
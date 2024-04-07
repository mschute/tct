import React from 'react';

const Form = ({fields, model, modelName, handleInputChange, handleSubmit, handleCancel}) => {

    return (
        <div>
            <h2>{modelName} Form</h2>
            <form onSubmit={handleSubmit}>
                {fields.map(({name, value, label, type, disabled, min, step, options}) => (
                    <div key={name}>
                        <label>
                            {label}:
                            {type === "select" ? (
                                <select
                                    name={name}
                                    value={value}
                                    onChange={handleInputChange}
                                    disabled={disabled}
                                    multiple={name === 'locationId'}
                                >
                                    {options && options.map((option, index) => {
                                        switch (name) {
                                            case "vehicleID":
                                                return (
                                                    <option key={index} value={option.vehicleId}>
                                                        {`${option.vehicleId}: ${option.make} ${option.model}`}
                                                    </option>
                                                );
                                            case "customerID":
                                                return (
                                                    <option key={index} value={option.customerId}>
                                                        {`${option.customerId}: ${option.firstName} ${option.lastName}`}
                                                    </option>
                                                );
                                            case "driverID":
                                                return (
                                                    <option key={index} value={option.driverId}>
                                                        {`${option.driverId}: ${option.firstName} ${option.lastName}`}
                                                    </option>
                                                );
                                            case "locationId":
                                                return (
                                                    <option key={option.locationId} value={option.locationId}>
                                                        {`${option.locationId}: ${option.name}`}
                                                    </option>
                                                );
                                            default:
                                                return null;
                                        }
                                    })}
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    value={value}
                                    onChange={handleInputChange}
                                    disabled={disabled}
                                    min={min}
                                    step={step}
                                />
                            )}
                        </label>
                        <br/>
                    </div>
                ))}
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default Form;
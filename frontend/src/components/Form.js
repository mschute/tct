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
                                    multiple={name === 'locationIds'}
                                >
                                    <option value="">Select...</option>
                                    {options && options.map((option, index) => {
                                        switch (name) {
                                            case "vehicleId":
                                                return (
                                                    <option key={option.vehicleId} value={option.vehicleId}>
                                                        {`${option.vehicleId}: ${option.make} ${option.model}`}
                                                    </option>
                                                );
                                            case "customerId":
                                                return (
                                                    <option key={option.customerId} value={option.customerId}>
                                                        {`${option.customerId}: ${option.firstName} ${option.lastName}`}
                                                    </option>
                                                );
                                            case "driverId":
                                                return (
                                                    <option key={option.driverId} value={option.driverId}>
                                                        {`${option.driverId}: ${option.firstName} ${option.lastName}`}
                                                    </option>
                                                );
                                            case "locationIds":
                                                return (
                                                    <option key={option.locationId} value={option.locationId}>
                                                        {`${option.locationId}: ${option.locationName}`}
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
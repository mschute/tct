import React from 'react';
import '../styles/Form.css';

const Form = ({fields, modelName, handleInputChange, handleSubmit, handleCancel}) => {

    return (
        <div className='form-container'>
            <h2 className='form-title'>{modelName} Form</h2>
            <form onSubmit={handleSubmit}>
                {fields.map(({name, value, label, type, disabled, min, step, options}) => (
                    <div key={name}>
                        <label className='form-label'>
                            {label}
                            {type === "select" ? (
                                <select
                                    className='form-select'
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
                                    className='form-input'
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
                
                <div className='button-container'>
                    <button type="submit" className='primary-button'>Save</button>
                    <button type="button" onClick={handleCancel} className='delete-button'>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
import React from 'react';
import "../styles/Form.css";

const UserForm = ({fields, modelName, handleInputChange, handleRoleAssign, handleCancelEdit}) => {
    return (
        <div className='form-container'>
            <h2 className='form-title'>{modelName} Form</h2>
            <form onSubmit={handleRoleAssign}>
                {fields.map(({name, value, label, type, disabled, options}) => (
                    <div key={name}>
                        <label className='form-label'>
                            {label} :
                            {type === "select" ? (
                                <select
                                    className='form-input'
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={handleInputChange}
                                >
                                    {options.map((option, name) => (
                                        <option key={name} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>) : (
                                <input
                                    className='form-input'
                                    type={type}
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                />
                            )}
                        </label>
                    </div>
                ))}
                <button className="primary-button" type="submit" onClick={handleRoleAssign}>Save</button>
                <button className="secondary-button" type="button" onClick={handleCancelEdit}>Cancel</button>
            </form>
        </div>
    );
};

export default UserForm;


import React from 'react';

const CustomersForm = ({ customer, handleInputChange, handleSubmit, handleCancel }) => {
    return (
        <div>
            <h2>Customer Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={customer.firstName} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={customer.lastName} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Date of Birth:
                    <input type="date" name="dob" value={customer.dob} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Nationality:
                    <input type="text" name="nationality" value={customer.nationality} onChange={handleInputChange}/>
                </label>
                <br/>
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CustomersForm;
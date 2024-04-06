import React from 'react';

const Form = ({model, handleInputChange, handleSubmit, handleCancel}) => {
    
    const getType = (str) => {
        if (str === "dob"){
            return "date"
        }
        return "text"
    }

    const getDisabled = (str) => {
        if (str.includes("Id")){
            return true
        }
        return false
    }
    
    return (
        <div>
            <h2>{typeof(model)} Form</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(model).map(([key, value]) => (
                    <div key={key}>
                        <label>
                            {key}:
                            <input
                                type={getType(key)}
                                name={key}
                                value={value}
                                onChange={handleInputChange}
                                disabled={getDisabled(key)}
                            />
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
import React, {useState, useEffect} from 'react';
import service from '../service/DriverService';
import List from "./List";
import Form from "./Form";
import "../styles/table.css";
import {validateDOB, validateWord, validateDrivingLicense} from "../helpers/validation";

const Drivers = ({jwtToken}) => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [editingDriver, setEditingDriver] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const modelName = "Driver";

    useEffect(() => {
        fetchDrivers(jwtToken);
    }, []);
    
    const clearErrorMessage = () => {
        setErrorMessage('');
    }
    
    const fetchDrivers = async (jwtToken) => {
        try {
            const driversData = await service.getDrivers(jwtToken);
            setDrivers(driversData);
            clearErrorMessage();
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (driverId) => {
        const selected = drivers.find((driver) => driver.driverId === driverId);
        setSelectedDriver(null);
        setIsFormOpen(true);

        setEditingDriver({
            driverId: selected.driverId,
            firstName: selected.firstName,
            lastName: selected.lastName,
            dob: selected.dob,
            drivingLicenseNo: selected.drivingLicenseNo
        });
    };

    const handleDelete = async (driverId) => {
        try {
            await service.deleteDriver(driverId, jwtToken)
            fetchDrivers(jwtToken);
        } catch (error) {
            setErrorMessage('Error deleting driver. Please try again.');
        }
    };

    const handleCreate = () => {
        setSelectedDriver(null);
        setEditingDriver({firstName: '', lastName: '', dob: '', drivingLicenseNo: ''});
        setIsFormOpen(true)
    };

    const handleCancelEdit = () => {
        setEditingDriver(null);
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            clearErrorMessage();
            
            if (editingDriver) {
                let error = validateWord("First Name", editingDriver.firstName);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }

                error = validateWord("Last Name", editingDriver.lastName);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }

                error = validateDOB("Date of Birth", editingDriver.dob);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }

                error = validateDrivingLicense("Driving License", editingDriver.drivingLicenseNo);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                    
                if (editingDriver.driverId) {
                    await service.updateDriver(editingDriver.driverId, editingDriver, jwtToken);

                } else {
                    const {driverId, ...newDriver} = editingDriver;
                    await service.createDriver(newDriver, jwtToken)
                }
                await fetchDrivers(jwtToken);
                setEditingDriver(null);
                setIsFormOpen(false);
            }
        } catch (error) {
            setErrorMessage('Error saving driver. Please try again');
            console.error('Response data:', error.response?.data);
        }
    };

    return (
        <div>
            <List model={drivers} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete}/>
            {editingDriver && (
                <Form
                    fields={[
                        {
                            name: "driverId",
                            label: "Driver ID",
                            value: editingDriver.driverId,
                            type: "text",
                            disabled: true,
                        },
                        {
                            name: "firstName",
                            label: "First Name",
                            value: editingDriver.firstName,
                            type: "text",
                            disabled: false,
                        },
                        {
                            name: "lastName",
                            label: "Last Name",
                            value: editingDriver.lastName,
                            type: "text",
                            disabled: false,
                        },
                        {
                            name: "dob",
                            label: "Date of Birth",
                            value: editingDriver.dob,
                            type: "date",
                            disabled: false,
                        },
                        {
                            name: "drivingLicenseNo",
                            label: "Driving License No",
                            value: editingDriver.drivingLicenseNo,
                            type: "text",
                            disabled: false,
                        },
                    ]}
                    model={editingDriver}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingDriver({...editingDriver, [e.target.name]: e.target.value})}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}            
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {isFormOpen === true ? "" : (<button className="primary-button" onClick={handleCreate}>Add new</button>)}
        </div>
    );
};

export default Drivers;
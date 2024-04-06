import React, { useState, useEffect } from 'react';
import service from '../service/DriverService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [editingDriver, setEditingDriver] = useState(null);
    const modelName = "Driver";

    useEffect(() => {
        // Fetch drivers data when component mounts
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            const driversData = await service.getDrivers();
            setDrivers(driversData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (driverId) => {
        console.log('Edit button clicked for driver driverId:', driverId);
        const selected = drivers.find((driver) => driver.driverId === driverId);
        console.log('Selected driver:', selected);
        setSelectedDriver(null);

        // Ensure that the property names match the expected format
        setEditingDriver({ driverId: selected.driverId, firstName: selected.firstName, lastName: selected.lastName, dob: selected.dob, drivingLicenseNo: selected.drivingLicenseNo});
    };

    const handleDelete = async (driverId) => {
        try {
            await service.deleteDriver(driverId)
            fetchDrivers();
        } catch (error) {
            console.error('Error deleting driver:', error);
        }
    };

    const handleViewDetails = (driverId) => {
        const selected = drivers.find((driver) => driver.driverId === driverId);
        setSelectedDriver(selected);
        setEditingDriver(null);
    };

    const handleCreate = () => {
        setSelectedDriver(null);
        setEditingDriver({ firstName: '', lastName: '', dob: '', drivingLicenseNo: '' });
    };

    const handleCancelEdit = () => {
        setEditingDriver(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Driver:', editingDriver);

            if (editingDriver) {
                if (editingDriver.driverId) {
                    console.log('Updating existing driver:', editingDriver);
                    await service.updateDriver(editingDriver.driverId, editingDriver);

                } else {
                    // Remove the existing driverId property for new drivers
                    const { driverId, ...newDriver } = editingDriver;
                    console.log('Creating new driver:', newDriver);
                    await service.createDriver(newDriver)
                }
                fetchDrivers();
            }
        } catch (error) {
            console.error('Error saving driver:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingDriver(null);
        }
    };

    return (
        <div>
            <List model={drivers} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedDriver && <Details model={selectedDriver} modelName={modelName} />}
            {editingDriver && (
                <Form
                    model={editingDriver}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingDriver({ ...editingDriver, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            <button onClick={handleCreate}>Add new</button>
        </div>
    );
};

export default Drivers;
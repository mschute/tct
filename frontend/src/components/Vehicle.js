import React, { useState, useEffect } from 'react';
import service from '../service/VehicleService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const modelName = "Vehicle";

    useEffect(() => {
        // Fetch vehicles data when component mounts
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const vehiclesData = await service.getVehicles();
            setVehicles(vehiclesData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (vehicleId) => {
        console.log('Edit button clicked for vehicle vehicleId:', vehicleId);
        const selected = vehicles.find((vehicle) => vehicle.vehicleId === vehicleId);
        console.log('Selected vehicle:', selected);
        setSelectedVehicle(null);

        // Ensure that the property names match the expected format
        setEditingVehicle({ vehicleId: selected.vehicleId, make: selected.make, model: selected.model, gasType: selected.gasType, seats: selected.seats, pricePerDay: selected.pricePerDay});
    };

    const handleDelete = async (vehicleId) => {
        try {
            await service.deleteVehicle(vehicleId)
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    const handleViewDetails = (vehicleId) => {
        const selected = vehicles.find((vehicle) => vehicle.vehicleId === vehicleId);
        setSelectedVehicle(selected);
        setEditingVehicle(null);
    };

    const handleCreate = () => {
        setSelectedVehicle(null);
        setEditingVehicle({ make: '', model: '', gasType: '', seats: '', pricePerDay: ''});
    };

    const handleCancelEdit = () => {
        setEditingVehicle(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Vehicle:', editingVehicle);

            if (editingVehicle) {
                if (editingVehicle.vehicleId) {
                    console.log('Updating existing vehicle:', editingVehicle);
                    await service.updateVehicle(editingVehicle.vehicleId, editingVehicle);

                } else {
                    // Remove the existing vehicleId property for new vehicles
                    const { vehicleId, ...newVehicle } = editingVehicle;
                    console.log('Creating new vehicle:', newVehicle);
                    await service.createVehicle(newVehicle)
                }
                fetchVehicles();
            }
        } catch (error) {
            console.error('Error saving vehicle:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingVehicle(null);
        }
    };

    return (
        <div>
            <List model={vehicles} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedVehicle && <Details model={selectedVehicle} modelName={modelName} />}
            {editingVehicle && (
                <Form
                    model={editingVehicle}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingVehicle({ ...editingVehicle, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            <button onClick={handleCreate}>Add new</button>
        </div>
    );
};

export default Vehicles;
import React, { useState, useEffect } from 'react';
import service from '../service/VehicleService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";
import "../styles/table.css";

const Vehicles = ({jwtToken}) => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const modelName = "Vehicle";

    useEffect(() => {
        // Fetch vehicles data when component mounts
        fetchVehicles(jwtToken);
    }, []);

    const fetchVehicles = async () => {
        try {
            const vehiclesData = await service.getVehicles(jwtToken);
            setVehicles(vehiclesData);
            console.log("This is vehicles data:", JSON.stringify(vehiclesData))
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (vehicleId) => {
        const selected = vehicles.find((vehicle) => vehicle.vehicleId === vehicleId);
        setSelectedVehicle(null);
        
        setEditingVehicle({ vehicleId: selected.vehicleId, make: selected.make, model: selected.model, gasType: selected.gasType, seats: selected.seats, pricePerDay: selected.pricePerDay});
    };

    const handleDelete = async (vehicleId) => {
        try {
            await service.deleteVehicle(vehicleId, jwtToken)
            fetchVehicles(jwtToken);
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

            if (editingVehicle) {
                if (editingVehicle.vehicleId) {
                    await service.updateVehicle(editingVehicle.vehicleId, editingVehicle, jwtToken);

                } else {
                    const { vehicleId, ...newVehicle } = editingVehicle;
                    await service.createVehicle(newVehicle, jwtToken)
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
                    fields={[
                        {name:"vehicleId", label:"Vehicle ID", value:editingVehicle.vehicleId, type:"text", disabled:true, min: null, step: null},
                        {name:"make", label:"Make", value:editingVehicle.make, type:"text", disabled:false, min: null, step: null},
                        {name:"model", label:"Model", value:editingVehicle.model, type:"text", disabled:false, min: null, step: null},
                        {name:"gasType", label:"Gas Type", value:editingVehicle.gasType, type:"text", disabled:false, min: null, step: null},
                        {name:"seats", label:"Seats", value:editingVehicle.seats, type:"number", disabled:false, min: 5, step: 1},
                        {name:"pricePerDay", label:"Price Per Day", value:editingVehicle.pricePerDay, type:"number", disabled:false, min: 0, step: 25},
                    ]}
                    model={editingVehicle}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingVehicle({ ...editingVehicle, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            <button className="primary-button" onClick={handleCreate}>Add new</button>
        </div>
    );
};

export default Vehicles;
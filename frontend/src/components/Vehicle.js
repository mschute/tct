import React, {useState, useEffect} from 'react';
import service from '../service/VehicleService';
import List from "./List";
import Form from "./Form";
import "../styles/table.css";

const Vehicles = ({jwtToken}) => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const modelName = "Vehicle";

    useEffect(() => {
        fetchVehicles(jwtToken);
    }, []);

    const fetchVehicles = async () => {
        try {
            const vehiclesData = await service.getVehicles(jwtToken);
            setVehicles(vehiclesData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (vehicleId) => {
        const selected = vehicles.find((vehicle) => vehicle.vehicleId === vehicleId);
        setSelectedVehicle(null);

        setEditingVehicle({
            vehicleId: selected.vehicleId,
            make: selected.make,
            model: selected.model,
            gasType: selected.gasType,
            seats: selected.seats,
            pricePerDay: selected.pricePerDay
        });
    };

    const handleDelete = async (vehicleId) => {
        try {
            await service.deleteVehicle(vehicleId, jwtToken)
            fetchVehicles(jwtToken);
        } catch (error) {
            setErrorMessage('Error deleting vehicle. Please try again.');
        }
    };

    const handleCreate = () => {
        setSelectedVehicle(null);
        setEditingVehicle({make: '', model: '', gasType: '', seats: '', pricePerDay: ''});
    };

    const handleCancelEdit = () => {
        setEditingVehicle(null);
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {

            if (editingVehicle) {
                if (editingVehicle.vehicleId) {
                    await service.updateVehicle(editingVehicle.vehicleId, editingVehicle, jwtToken);

                } else {
                    const {vehicleId, ...newVehicle} = editingVehicle;
                    await service.createVehicle(newVehicle, jwtToken)
                }
                fetchVehicles();
            }
        } catch (error) {
            setErrorMessage('Error saving vehicle. Please try again');
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingVehicle(null);
            setIsFormOpen(false);
        }
    };

    return (
        <div>
            <List model={vehicles} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete}/>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {editingVehicle && (
                <Form
                    fields={[
                        {
                            name: "vehicleId",
                            label: "Vehicle ID",
                            value: editingVehicle.vehicleId,
                            type: "text",
                            disabled: true,
                            min: null,
                            step: null
                        },
                        {
                            name: "make",
                            label: "Make",
                            value: editingVehicle.make,
                            type: "text",
                            disabled: false,
                            min: null,
                            step: null
                        },
                        {
                            name: "model",
                            label: "Model",
                            value: editingVehicle.model,
                            type: "text",
                            disabled: false,
                            min: null,
                            step: null
                        },
                        {
                            name: "gasType",
                            label: "Gas Type",
                            value: editingVehicle.gasType,
                            type: "text",
                            disabled: false,
                            min: null,
                            step: null
                        },
                        {
                            name: "seats",
                            label: "Seats",
                            value: editingVehicle.seats,
                            type: "number",
                            disabled: false,
                            min: 5,
                            step: 1
                        },
                        {
                            name: "pricePerDay",
                            label: "Price Per Day",
                            value: editingVehicle.pricePerDay,
                            type: "number",
                            disabled: false,
                            min: 0,
                            step: 25
                        },
                    ]}
                    model={editingVehicle}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingVehicle({...editingVehicle, [e.target.name]: e.target.value})}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            {isFormOpen === true ? "" : (<button className="primary-button" onClick={handleCreate}>Add new</button>)}
        </div>
    );
};

export default Vehicles;
import React, {useState, useEffect} from 'react';
import service from '../service/LocationService';
import List from "./List";
import Form from "./Form";
import "../styles/table.css";

const Locations = ({jwtToken}) => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [editingLocation, setEditingLocation] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const modelName = "Location";

    useEffect(() => {
        fetchLocations(jwtToken);
    }, []);

    const fetchLocations = async () => {
        try {
            const locationsData = await service.getLocations();
            setLocations(locationsData);
            clearErrorMessage();
        } catch (error) {
            console.error(error.message)
        }
    }

    const clearErrorMessage = () => {
        setErrorMessage('');
    }

    const handleEdit = (locationId, jwtToken) => {
        const selected = locations.find((location) => location.locationId === locationId);
        setSelectedLocation(null);

        setEditingLocation({
            locationId: selected.locationId,
            locationName: selected.locationName,
            locationAddress: selected.locationAddress,
            locationLat: selected.locationLat,
            locationLng: selected.locationLng,
            locationDescription: selected.locationDescription
        });
    };

    const handleDelete = async (locationId, jwtToken) => {
        try {
            await service.deleteLocation(locationId, jwtToken)
            fetchLocations(jwtToken);
        } catch (error) {
            setErrorMessage('Error deleting location. Please try again.');
        }
    };

    const handleCreate = () => {
        setSelectedLocation(null);
        setEditingLocation({
            locationName: '',
            locationAddress: '',
            locationLat: '',
            locationLng: '',
            locationDescription: ''
        });
        setIsFormOpen(true)
    };

    const handleCancelEdit = () => {
        setEditingLocation(null);
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Location:', editingLocation);

            if (editingLocation) {
                if (editingLocation.locationId) {
                    await service.updateLocation(editingLocation.locationId, editingLocation, jwtToken);

                } else {
                    const {locationId, ...newLocation} = editingLocation;
                    await service.createLocation(newLocation, jwtToken)
                }
                fetchLocations(jwtToken);
            }
        } catch (error) {
            setErrorMessage('Error saving location. Please try again');
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingLocation(null);
            setIsFormOpen(false);
        }
    };

    return (
        <div>
            <List model={locations} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete}/>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {editingLocation && (
                <Form
                    fields={[
                        {
                            name: "locationId",
                            label: "Location ID",
                            value: editingLocation.locationId,
                            type: "text",
                            disabled: true,
                            min: null,
                            step: null
                        },
                        {
                            name: "locationName",
                            label: "Location Name",
                            value: editingLocation.locationName,
                            type: "text",
                            disabled: false,
                            min: null,
                            step: null
                        },
                        {
                            name: "locationAddress",
                            label: "Location Address",
                            value: editingLocation.locationAddress,
                            type: "text",
                            disabled: false,
                            min: null,
                            step: null
                        },
                        {
                            name: "locationLat",
                            label: "Location Latitude",
                            value: editingLocation.locationLat,
                            type: "text",
                            disabled: false,
                            min: null,
                            step: null
                        },
                        {
                            name: "locationLng",
                            label: "Location Longitude",
                            value: editingLocation.locationLng,
                            type: "text",
                            disabled: false,
                            min: null,
                            step: null
                        },
                        {
                            name: "locationDescription",
                            label: "Location Description",
                            value: editingLocation.locationDescription,
                            type: "text",
                            disabled: false,
                            min: null,
                            step: null
                        },
                    ]}
                    model={editingLocation}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingLocation({...editingLocation, [e.target.name]: e.target.value})}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            {isFormOpen === true ? "" : (<button className="primary-button" onClick={handleCreate}>Add new</button>)}
        </div>
    );
};

export default Locations;
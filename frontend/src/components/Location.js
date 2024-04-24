import React, {useState, useEffect} from 'react';
import service from '../service/LocationService';
import List from "./List";
import Form from "./Form";
import "../styles/table.css";
import {validateLatitude, validateLongitude, validateMultipleWords, validateNotEmpty} from "../helpers/validation";

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

    const clearErrorMessage = () => {
        setErrorMessage('');
    }
    
    const fetchLocations = async () => {
        try {
            const locationsData = await service.getLocations();
            setLocations(locationsData);
            clearErrorMessage();
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (locationId) => {
        const selected = locations.find((location) => location.locationId === locationId);
        setSelectedLocation(null);
        setIsFormOpen(true);

        setEditingLocation({
            locationId: selected.locationId,
            locationName: selected.locationName,
            locationAddress: selected.locationAddress,
            locationLat: selected.locationLat,
            locationLng: selected.locationLng,
            locationDescription: selected.locationDescription
        });
    };

    const handleDelete = async (locationId) => {
        try {
            await service.deleteLocation(locationId, jwtToken)
            fetchLocations();
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
            clearErrorMessage();

            if (editingLocation) {
                let error = validateMultipleWords("Location Name", editingLocation.locationName);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                error = validateNotEmpty("Location Address", editingLocation.locationAddress);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                error = validateLatitude("Latitude", editingLocation.locationLat);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }

                error = validateLongitude("Longitude", editingLocation.locationLng);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }

                error = validateNotEmpty("Location Description", editingLocation.locationDescription);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                if (editingLocation.locationId) {
                    await service.updateLocation(editingLocation.locationId, editingLocation, jwtToken);

                } else {
                    const {locationId, ...newLocation} = editingLocation;
                    await service.createLocation(newLocation, jwtToken)
                }
                await fetchLocations(jwtToken);
                setEditingLocation(null);
                setIsFormOpen(false);
                setErrorMessage("");
            }
        } catch (error) {
            setErrorMessage('Error saving location. Please try again');
            console.error('Response data:', error.response?.data);
        }
    };

    return (
        <div>
            <List model={locations} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete}/>
            {editingLocation && (
                <Form
                    fields={[
                        {
                            name: "locationId",
                            label: "Location ID",
                            value: editingLocation.locationId,
                            type: "text",
                            disabled: true,
                        },
                        {
                            name: "locationName",
                            label: "Location Name",
                            value: editingLocation.locationName,
                            type: "text",
                            disabled: false,
                        },
                        {
                            name: "locationAddress",
                            label: "Location Address",
                            value: editingLocation.locationAddress,
                            type: "text",
                            disabled: false,
                        },
                        {
                            name: "locationLat",
                            label: "Location Latitude",
                            value: editingLocation.locationLat,
                            type: "text",
                            disabled: false,
                        },
                        {
                            name: "locationLng",
                            label: "Location Longitude",
                            value: editingLocation.locationLng,
                            type: "text",
                            disabled: false,
                        },
                        {
                            name: "locationDescription",
                            label: "Location Description",
                            value: editingLocation.locationDescription,
                            type: "text",
                            disabled: false,
                        },
                    ]}
                    model={editingLocation}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingLocation({...editingLocation, [e.target.name]: e.target.value})}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {isFormOpen === true ? "" : (<button className="primary-button" onClick={handleCreate}>Add new</button>)}
        </div>
    );
};

export default Locations;
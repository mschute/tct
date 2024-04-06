import React, { useState, useEffect } from 'react';
import service from '../service/LocationService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";

const Locations = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [editingLocation, setEditingLocation] = useState(null);
    const locationAddressName = "Location";

    useEffect(() => {
        // Fetch locations data when component mounts
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const locationsData = await service.getLocations();
            setLocations(locationsData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (locationId) => {
        console.log('Edit button clicked for location locationId:', locationId);
        const selected = locations.find((location) => location.locationId === locationId);
        console.log('Selected location:', selected);
        setSelectedLocation(null);

        // Ensure that the property names match the expected format
        setEditingLocation({ locationId: selected.locationId, locationName: selected.locationName, locationAddress: selected.locationAddress, locationLat: selected.locationLat, locationLng: selected.locationLng, locationDescription: selected.locationDescription});
    };

    const handleDelete = async (locationId) => {
        try {
            await service.deleteLocation(locationId)
            fetchLocations();
        } catch (error) {
            console.error('Error deleting location:', error);
        }
    };

    const handleViewDetails = (locationId) => {
        const selected = locations.find((location) => location.locationId === locationId);
        setSelectedLocation(selected);
        setEditingLocation(null);
    };

    const handleCreate = () => {
        setSelectedLocation(null);
        setEditingLocation({ locationName: '', locationAddress: '', locationLat: '', locationLng: '', locationDescription: ''});
    };

    const handleCancelEdit = () => {
        setEditingLocation(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Location:', editingLocation);

            if (editingLocation) {
                if (editingLocation.locationId) {
                    console.log('Updating existing location:', editingLocation);
                    await service.updateLocation(editingLocation.locationId, editingLocation);

                } else {
                    // Remove the existing locationId property for new locations
                    const { locationId, ...newLocation } = editingLocation;
                    console.log('Creating new location:', newLocation);
                    await service.createLocation(newLocation)
                }
                fetchLocations();
            }
        } catch (error) {
            console.error('Error saving location:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingLocation(null);
        }
    };

    return (
        <div>
            <List locationAddress={locations} locationAddressName={locationAddressName} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedLocation && <Details locationAddress={selectedLocation} locationAddressName={locationAddressName} />}
            {editingLocation && (
                <Form
                    locationAddress={editingLocation}
                    locationAddressName={locationAddressName}
                    handleInputChange={(e) => setEditingLocation({ ...editingLocation, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            <button onClick={handleCreate}>Add new</button>
        </div>
    );
};

export default Locations;
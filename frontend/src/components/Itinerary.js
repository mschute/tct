import React, { useState, useEffect } from 'react';
import service from '../service/ItineraryService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";

const Itinerary = () => {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [editingItinerary, setEditingItinerary] = useState(null);
    const modelName = "Itinerary";

    useEffect(() => {
        // Fetch itineraries data when component mounts
        fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        try {
            const itinerariesData = await service.getItineraries();
            setItineraries(itinerariesData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (itineraryId) => {
        console.log('Edit button clicked for itinerary itineraryId:', itineraryId);
        const selected = itineraries.find((itinerary) => itinerary.itineraryId === itineraryId);
        console.log('Selected itinerary:', selected);
        setSelectedItinerary(null);

        // Ensure that the property names match the expected format
        setEditingItinerary({ itineraryId: selected.itineraryId, tripDate: selected.tripDate, passengerCount: selected.passengerCount});
    };

    const handleDelete = async (itineraryId) => {
        try {
            await service.deleteItinerary(itineraryId)
            fetchItineraries();
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }
    };

    const handleViewDetails = (itineraryId) => {
        const selected = itineraries.find((itinerary) => itinerary.itineraryId === itineraryId);
        setSelectedItinerary(selected);
        setEditingItinerary(null);
    };

    const handleCreate = () => {
        setSelectedItinerary(null);
        setEditingItinerary({ tripDate: '', passengerCount: ''});
    };

    const handleCancelEdit = () => {
        setEditingItinerary(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Itinerary:', editingItinerary);

            if (editingItinerary) {
                if (editingItinerary.itineraryId) {
                    console.log('Updating existing itinerary:', editingItinerary);
                    await service.updateItinerary(editingItinerary.itineraryId, editingItinerary);

                } else {
                    // Remove the existing itineraryId property for new itineraries
                    const { itineraryId, ...newItinerary } = editingItinerary;
                    console.log('Creating new itinerary:', newItinerary);
                    await service.createItinerary(newItinerary)
                }
                fetchItineraries();
            }
        } catch (error) {
            console.error('Error saving itinerary:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingItinerary(null);
        }
    };

    return (
        <div>
            <List model={itineraries} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedItinerary && <Details model={selectedItinerary} modelName={modelName} />}
            {editingItinerary && (
                <Form
                    model={editingItinerary}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingItinerary({ ...editingItinerary, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            <button onClick={handleCreate}>Add new</button>
        </div>
    );
};

export default Itinerary;
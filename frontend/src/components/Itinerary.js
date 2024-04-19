import React, { useState, useEffect } from 'react';
import service from '../service/ItineraryService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";
import ItineraryForm from "./ItineraryForm";

const Itinerary = ({ itineraryDTO, handleRouteUpdate, handleTripDateChange, handleStartTimeChange, handleEndTimeChange, handleDeleteItineraryButtonClick, handleStopTime, handleNoteChange, isAuthenticated, jwtToken }) => {
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
        const selected = itineraries.find((itinerary) => itinerary.itineraryId === itineraryId);
        setSelectedItinerary(null);

        setEditingItinerary({ itineraryId: selected.itineraryId, tripDate: selected.tripDate, tripStartTime: selected.tripStartTime, tripEndTime: selected.tripEndTime, passengerCount: selected.passengerCount, customerName: selected.customerName, itineraryNotes: selected.itineraryNotes, itineraryLocations: selected.itineraryLocations });
    };

    const handleDelete = async (itineraryId, jwtToken) => {
        try {
            await service.deleteItinerary(itineraryId, jwtToken)
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
        setEditingItinerary({ tripDate: '', tripStartTime: '', tripEndTime: '', passengerCount: '', customerName: '', itineraryNotes: '', itineraryLocations: ''});
    };

    const handleCancelEdit = () => {
        setEditingItinerary(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editingItinerary) {
                if (editingItinerary.itineraryId) {
                    console.log('Updating existing itinerary:', editingItinerary);
                    await service.updateItinerary(editingItinerary.itineraryId, editingItinerary, jwtToken);

                } else {
                    // Remove the existing itineraryId property for new itineraries
                    const { itineraryId, ...newItinerary } = editingItinerary;
                    console.log('Creating new itinerary:', newItinerary);
                    await service.createItinerary(newItinerary, jwtToken)
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
            <ItineraryForm
                itineraryDTO={itineraryDTO}
                handleRouteUpdate={handleRouteUpdate}
                handleTripDateChange={handleTripDateChange}
                handleStartTimeChange={handleStartTimeChange}
                handleEndTimeChange={handleEndTimeChange}
                handleDeleteItineraryButtonClick={handleDeleteItineraryButtonClick}
                handleStopTime={handleStopTime}
                handleNoteChange={handleNoteChange}
                isAuthenicated={isAuthenticated}
                // handleInputChange={(e) => setEditingItinerary({ ...editingItinerary, [e.target.name]: e.target.value })}*/}
            />
        </div>
    );
};

export default Itinerary;
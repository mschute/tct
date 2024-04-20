import React, { useState, useEffect } from 'react';
import List from "./List";
import customerService from "../service/CustomerService";
import locationService from "../service/LocationService";
import service from "../service/ItineraryService";
import "../styles/table.css";

const ItinerarySpecific = ({jwtToken, activeCustomerId}) => {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [editingBooking, setEditingItinerary] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [locations, setLocations] = useState([]);
    const modelName = "Pending";

    useEffect(() => {
        fetchItineraries(activeCustomerId, jwtToken);
    }, []);

    const fetchItineraries = async () => {
        try {
            const itinerariesData = await service.getItinerariesByCustomer(activeCustomerId, jwtToken);
            setSelectedItinerary(null);
            setEditingItinerary(null);
            setItineraries(itinerariesData);

        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDelete = async (itineraryId, jwtToken) => {
        try {
            await service.deleteItinerary(itineraryId, jwtToken)
            fetchItineraries();
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }
    };

    return (
        <div>
            <List model={itineraries} modelName={modelName} />
        </div>
    );
};

export default ItinerarySpecific;
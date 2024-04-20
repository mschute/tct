import React, { useState, useEffect } from 'react';
import List from "./List";
import service from "../service/ItineraryService";
import "../styles/table.css";

const Itinerary = ({jwtToken, activeCustomerId}) => {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [editingBooking, setEditingItinerary] = useState(null);
    const modelName = "Pending Itineraries";

    useEffect(() => {
        fetchItineraries(activeCustomerId, jwtToken);
    }, []);

    const fetchItineraries = async () => {
        try {
            const itinerariesData = await service.getItineraries(jwtToken);
            setSelectedItinerary(null);
            setEditingItinerary(null);
            setItineraries(itinerariesData);

        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <List model={itineraries} modelName={modelName} />
        </div>
    );
};

export default Itinerary;
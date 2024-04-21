import React, { useState, useEffect } from 'react';
import List from "./List";
import service from "../service/ItineraryService";
import "../styles/table.css";

const Itinerary = ({jwtToken, activeCustomerId}) => {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [editingItinerary, setEditingItinerary] = useState(null);
    const modelName = "Pending Itineraries";

    useEffect(() => {
        fetchItineraries(jwtToken);
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

    const handleDelete = async (itineraryId) => {
        try {
            await service.deleteItinerary(itineraryId, jwtToken)
            fetchItineraries(jwtToken);
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div>
            <List model={itineraries} modelName={modelName} handleDelete={handleDelete}/>
        </div>
    );
};

export default Itinerary;
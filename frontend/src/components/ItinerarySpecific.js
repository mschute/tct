import React, {useState, useEffect} from 'react';
import List from "./List";
import service from "../service/ItineraryService";
import "../styles/table.css";


const ItinerarySpecific = ({jwtToken, activeCustomerId}) => {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [editingBooking, setEditingItinerary] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
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
            clearErrorMessage();
        } catch (error) {
            console.error(error.message);
        }
    };

    const clearErrorMessage = () => {
        setErrorMessage('');
    }

    const handleDelete = async (itineraryId) => {
        try {
            await service.deleteItinerary(itineraryId, jwtToken)
            fetchItineraries(jwtToken);
        } catch (error) {
            setErrorMessage('Error deleting itinerary. Please try again.');
        }
    };

    return (
        <div>
            <List model={itineraries} modelName={modelName} handleDelete={handleDelete}/>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default ItinerarySpecific;
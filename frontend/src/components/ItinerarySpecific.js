import React, { useState, useEffect } from 'react';
import List from "./List";
import service from "../service/ItineraryService";
import locationService from "../service/LocationService";
import customerService from "../service/CustomerService";
import "../styles/table.css";


const ItinerarySpecific = ({jwtToken, activeCustomerId}) => {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [editingBooking, setEditingItinerary] = useState(null);
    // const [customers, setCustomers] = useState(null);
    // const [locations, setLocations] = useState(null);
    const modelName = "Pending";

    useEffect(() => {
        fetchItineraries(activeCustomerId, jwtToken);
        // fetchLocations();
        // fetchCustomers(jwtToken);
    }, []);

    const fetchItineraries = async () => {
        console.log("This is fetch jwtToken", JSON.stringify(jwtToken));
        try {
            const itinerariesData = await service.getItinerariesByCustomer(activeCustomerId, jwtToken);
            setSelectedItinerary(null);
            setEditingItinerary(null);
            setItineraries(itinerariesData);

        } catch (error) {
            console.error(error.message);
        }
    };

    // const fetchCustomers = async (jwtToken) => {
    //     try {
    //         const customersData = await customerService.getCustomers(jwtToken);
    //         setCustomers(customersData);
    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // }
    //
    // const fetchLocations = async () => {
    //     try {
    //         const locationsData = await locationService.getLocations();
    //         setLocations(locationsData);
    //     } catch (error) {
    //         console.error(error.message)
    //     }
    // }

    const handleDelete = async (itineraryId) => {
        console.log("This is jwt in Itinerary Specific", JSON.stringify(jwtToken));
        try {
            await service.deleteItinerary(itineraryId, jwtToken)
            fetchItineraries(jwtToken);
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }
    };

    return (
        <div>
            <List model={itineraries} modelName={modelName} handleDelete={handleDelete}/>
        </div>
    );
};

export default ItinerarySpecific;
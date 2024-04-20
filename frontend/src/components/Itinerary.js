import React, { useState, useEffect } from 'react';
import List from "./List";
import customerService from "../service/CustomerService";
import locationService from "../service/LocationService";
import service from "../service/ItineraryService";
import "../styles/table.css";

const Itinerary = ({jwtToken, activeCustomerId}) => {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [editingBooking, setEditingItinerary] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [locations, setLocations] = useState([]);
    const modelName = "Pending Customer Itineraries";

    useEffect(() => {
        fetchItineraries(activeCustomerId, jwtToken);
        //TODO Do I need Customers and Locations
        fetchCustomers(jwtToken);
        fetchLocations(jwtToken);
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

    //TODO May not need this 
    const fetchCustomers = async () => {
        try {
            const customersData = await customerService.getCustomers(jwtToken);
            setCustomers(customersData);
        } catch (error) {
            console.error(error.message)
        }
    }
    
    const fetchLocations = async () => {
        try {
            const locationsData = await locationService.getLocations();
            setLocations(locationsData);
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <List model={itineraries} modelName={modelName} />
        </div>
    );
};

export default Itinerary;
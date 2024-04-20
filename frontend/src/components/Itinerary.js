import React, {useState, useEffect} from 'react';
import service from '../service/ItineraryService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";
import ItineraryForm from "./ItineraryForm";
import bookingLocationService from "../service/BookingLocationService";


const Itinerary = ({
                       itineraryDTO,
                       handleRouteUpdate,
                       handleTripDateChange,
                       handleStartTimeChange,
                       handleEndTimeChange,
                       handleDeleteItineraryButtonClick,
                       handleStopTime,
                       handleNoteChange,
                       jwtToken,
                       activeCustomerId,
                       handlePassengerCount,
                       handleInputChange
                   }) => {
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

    const handleCancelEdit = () => {
        setEditingItinerary(null);
    };

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log("The handle form submit is being called")
    //     console.log("The editing itinerary", itineraryDTO)
    //     try {
    //         if (itineraryDTO) {
    //             itineraryDTO.tripStartTime += ":00";
    //             const endTime = itineraryDTO.tripEndTime
    //            
    //             itineraryDTO.tripEndTime += ":00";
    //             const {itineraryId, ...newItinerary} = editingItinerary;
    //             console.log('Creating new itinerary:', newItinerary);
    //             await service.createItinerary(newItinerary, jwtToken)
    //
    //            
    //             });
    //             fetchItineraries();
    //         }
    //     } catch (error) {
    //         console.error('Error saving itinerary:', error);
    //         console.error('Response data:', error.response?.data);
    //     } finally {
    //         setEditingItinerary(null);
    //     }
    // };

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
                activeCustomerId={activeCustomerId}
                handlePassengerCount={handlePassengerCount}
                handleInputChange={handleInputChange}
                //handleInputChange={(e) => setEditingItinerary({...editingItinerary, [e.target.name]: e.target.value})}
            />
        </div>
    );
};

export default Itinerary;
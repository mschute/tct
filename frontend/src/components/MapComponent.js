import React, {useEffect, useState} from 'react'
import {InfoWindow, Map, Marker, useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import '@react-google-maps/api'
import "../styles/MapComponent.css";
import DateInput from "./DateInput";
//https://www.npmjs.com/package/@vis.gl/react-google-maps?activeTab=readme
// https://stackoverflow.com/a/50549617

const MapComponent = () => {
    // TODO Make Markers dynamic, use axios, fetch marker data with await or async, map the data to the markers
    const markers = [
        {position: {lat: 56.469130, lng: -2.974890}, name: 'Pick-up', address: "236 Hilltown, Dundee DD3 7AU, UK"},
        {position: {lat: 57.322900, lng: -2.974890}, name: 'Loch Ness', address: "82FG+52 Huntly, UK"},
        {position: {lat: 56.627961, lng: -3.003921}, name: 'Glamis Castle', address: "Forfar DD8 1RJ"},
        {position: {lat: 56.673794, lng: -4.101798}, name: "Schiehallion", address: "Pitlochry PH16 5QE"},
        {position: {lat: 56.459190, lng: -2.967498}, name: 'Drop-off', address: "236 Hilltown, Dundee DD3 7AU, UK"}
    ];

    const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
    const [markerPositions, setMarkerPositions] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const [locationAddress, setLocationAddress] = useState('')
    const [activeMarker, setActiveMarker] = useState(null);
    const [totalTravelTime, setTotalTravelTime] = useState([]);

    // https://github.com/visgl/react-google-maps/blob/main/examples/directions/src/app.tsx#L98
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    // useSetTempItineraries when you want the directionsService to recalculate the route
    const [itineraries, setItineraries] = useState([markers[0], markers[markers.length - 1]])
    const [tempItineraries, setTempItineraries] = useState([markers[0], markers[markers.length - 1]])

    // Function to handle marker click event
    const handleMarkerClick = (marker) => {
        setIsInfoWindowOpen(true);
        setActiveMarker(marker);
    };

    // Function to handle info window close event
    const handleInfoWindowClose = () => {
        setActiveMarker(null)
        setIsInfoWindowOpen(false);
    };

    // Function to handle the button click in the info window
    const handleAddItineraryButtonClick = () => {
        const address = activeMarker.address

        const isAddressAlreadyAdded = tempItineraries.some((itinerary) => itinerary.address === address)
        if (isAddressAlreadyAdded) return;

        const newItinerary = activeMarker
        newItinerary.stopTime = 0;

        const insertAt = tempItineraries.length - 1;
        const newItineraries = [
            ...tempItineraries.slice(0, insertAt),
            newItinerary,
            ...tempItineraries.slice(insertAt)];

        setTempItineraries(newItineraries);
        handleInfoWindowClose();
    };

    const handleDeleteItineraryButtonClick = (index) => {
        const newItinerary = [...itineraries];
        newItinerary.splice(index, 1);
        setTempItineraries(newItinerary);
    }

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    }

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    }

    const handleAddStopTimeHour = (index) => {
        itineraries[index].stopTime += 15;
        const newAddedTime = [...itineraries];

        setItineraries(newAddedTime)
    }

    const handleDeleteStopTimeHour = (index) => {
        if (itineraries[index].stopTime === 0) return;
        itineraries[index].stopTime -= 15;
        const newDeletedTime = [...itineraries];
        setItineraries(newDeletedTime)
    }

    const calcTotalTime = () => {
        let totalTimeSeconds = 0;

        itineraries.forEach(itinerary => {
            totalTimeSeconds += itinerary.stopTime * 60 || 0;

            if (itinerary.travelTimeValue) {
                totalTimeSeconds += itinerary.travelTimeValue;
            }
        });
        return(formatTime(totalTimeSeconds))
    }

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return(`${hours} hours ${minutes} mins`);
    }

    // Initialize directions service and renderer
    useEffect(() => {
        if (!map) return;
        if (!routesLibrary) return;

        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer());
    }, [routesLibrary, map]);

    // Use directions service
    useEffect(() => {
        if (!directionsRenderer) return;
        if (!directionsService) return;

        if (tempItineraries.length < 3) {
            setItineraries(tempItineraries);
            return;
        }

        const origin = {location: {lat: tempItineraries[0].position.lat, lng: tempItineraries[0].position.lng}};
        const destination = {
            location: {
                lat: tempItineraries[tempItineraries.length - 1].position.lat,
                lng: tempItineraries[tempItineraries.length - 1].position.lng
            }
        };

        const waypoints = [];
        for (let i = 1; i < tempItineraries.length - 1; i++) {
            waypoints.push({location: {lat: tempItineraries[i].position.lat, lng: tempItineraries[i].position.lng}});
        }

        const travelMode = 'DRIVING';
        const request = {origin: origin, destination: destination, travelMode, waypoints}

        directionsService
            .route(request)
            .then(response => {
                directionsRenderer.setMap(map);
                directionsRenderer.setDirections(response);

                const legs = response.routes[0].legs;
                for (let i = 0; i < legs.length; i++) {
                    tempItineraries[i + 1].travelTime = legs[i].duration.text;
                    tempItineraries[i + 1].travelTimeValue = legs[i].duration.value;

                }
                setItineraries(tempItineraries);
            });

        return () => {
            directionsRenderer.setMap(null);
        }
    }, [tempItineraries]);

    const ItineraryPickUp = (props) => {
        return <>
            <p>Pick-up from {props.address} at 12:00</p>
        </>
    }

    const ItineraryDropOff = (props) => {
        if (itineraries.length > 2) {
            return <>
                <p>Drop-off to {props.address} travel-time={props.travelTime}</p>
            </>
        }

        return <>
            <p>Drop-off to {props.address}</p>
        </>
    }

    const ItineraryRemovable = (props) => {
        return <>
            <p>Via {props.address} travel-time={props.travelTime} stopTime={props.stopTime} mins</p>
            <button onClick={() => handleDeleteItineraryButtonClick(props.index)}>Remove from Itinerary</button>
            <>
                <button onClick={() => (handleDeleteStopTimeHour(props.index))}>-</button>
                <button onClick={() => (handleAddStopTimeHour(props.index))}>+</button>
            </>

        </>
    }

    const ItineraryRow = (props) => {
        if (props.index === 0) return <ItineraryPickUp address={props.address} stopTime={props.stopTime}/>;
        if (props.index === itineraries.length - 1) return <ItineraryDropOff address={props.address}
                                                                             stopTime={props.stopTime}
                                                                             travelTime={props.travelTime}/>;
        return <ItineraryRemovable address={props.address} stopTime={props.stopTime} index={props.index}
                                   travelTime={props.travelTime}/>;
    }

    return (
        <>
            <Map
                style={{width: '50vw', height: '50vh'}}
                defaultCenter={{lat: 56.46913, lng: -2.97489}}
                defaultZoom={10}
                zoomControl={true}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                onClick={handleMarkerClick}
            >
                {markerPositions.map((position, index) => (
                    <Marker
                        key={index}
                        position={position}
                        onClick={handleMarkerClick}
                    />
                ))}
                <InfoWindow position={activeMarker?.position} onCloseClick={handleInfoWindowClose}
                            visible={isInfoWindowOpen}>
                    <div>
                        <p>{locationAddress}</p>
                        <button onClick={handleAddItineraryButtonClick}>Add to Itinerary</button>
                    </div>
                </InfoWindow>

                {/*TODO Need to update Marker to AdvancedMarker*/}
                {markers.map((marker, index) => (
                    <Marker
                        key={marker.index}
                        text={marker.name}
                        position={marker.position}
                        onClick={() => handleMarkerClick(marker)}
                    />
                ))}

            </Map>
            <ul className="date-list">
                <li>
                    <DateInput dateLabel={"Start date: "} selectedDate={selectedStartDate}
                               handleDateChange={handleStartDateChange}/>
                </li>
                <li>
                    <DateInput dateLabel={"End date: "} selectedDate={selectedEndDate}
                               handleDateChange={handleEndDateChange}/>
                </li>
            </ul>
            <div>
                <h4>Itinerary</h4>
                {itineraries.length < 3 && <p>Please add a location from the map</p>}
                {}
                {itineraries.map((itinerary, index) => (
                    <ItineraryRow
                        index={index}
                        address={itinerary.address}
                        stopTime={itinerary.stopTime}
                        travelTime={itinerary.travelTime}
                    />
                ))}

                {}
            </div>

            <div>
                <h4>Total Tour Time</h4>
                <p>{calcTotalTime()}</p>
            </div>
        </>
    );
};

export default MapComponent;
import React, {useEffect, useState} from 'react'
import {InfoWindow, Map, Marker, useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import '@react-google-maps/api'
import "../styles/MapComponent.css";
import DateInput from "./DateInput";
import Itinerary from "./Itinerary";
import LocationService from "../service/LocationService";
import useFetch from '../hooks/useFetch';

//https://www.npmjs.com/package/@vis.gl/react-google-maps?activeTab=readme
// https://stackoverflow.com/a/50549617

const MapComponent = () => {
        const currentDate = new Date().toISOString().slice(0, 16);

        const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
        const [markerPositions, setMarkerPositions] = useState([]);
        const [selectedStartDate, setSelectedStartDate] = useState(currentDate)
        const [selectedEndDate, setSelectedEndDate] = useState(currentDate)
        const [locationAddress, setLocationAddress] = useState('')
        const [markers, setMarkers] = useState([])
        const [activeMarker, setActiveMarker] = useState(null);
        const [totalTravelTime, setTotalTravelTime] = useState('0 hr and 0 min');

        // https://github.com/visgl/react-google-maps/blob/main/examples/directions/src/app.tsx#L98
        const map = useMap();
        const routesLibrary = useMapsLibrary('routes');
        const [directionsService, setDirectionsService] = useState(null);
        const [directionsRenderer, setDirectionsRenderer] = useState(null);

        // useSetTempItineraries when you want the directionsService to recalculate the route
        const [itineraries, setItineraries] = useState([])
        const [tempItineraries, setTempItineraries] = useState([])

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

        const handleStartDateChange = (event) => {
            const {value} = event.target;
            setSelectedStartDate(value);
        }

        const handleEndDateChange = (event) => {
            const {value} = event.target
            setSelectedEndDate(value);
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
            return formatTime(totalTimeSeconds)
        }


        const formatTime = (totalSeconds) => {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            return (`${hours} hours ${minutes} mins`);
        }

        // Initialize directions service and renderer
        useEffect(() => {
            if (!map) return;
            if (!routesLibrary) return;

            setDirectionsService(new routesLibrary.DirectionsService());
            setDirectionsRenderer(new routesLibrary.DirectionsRenderer());
        }, [routesLibrary, map]);

        useEffect(() => {
            (async () => {
                const response = await LocationService.getLocations();

                const newMarkers = response.map(location => ({
                    index: location.locationId,
                    position: {lat: JSON.parse(location.locationLat), lng: JSON.parse(location.locationLng)},
                    name: location.locationName,
                    address: location.address,
                    description: location.locationDescription
                }));

                setMarkers(newMarkers);
            })();
        }, []);


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
                    const totalTime = calcTotalTime();
                    setTotalTravelTime(totalTime);
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
                return (<>
                    <p>Drop-off to {props.address} travel-time={props.travelTime}</p>
                </>)
            }

            return (<>
                <p>Drop-off to {props.address}</p>
            </>)
        }

        const ItineraryRemovable = (props) => {
            return (<>
                <p>Via {props.address} travel-time={props.travelTime} stopTime={props.stopTime} mins</p>
                <button onClick={() => handleDeleteItineraryButtonClick(props.index)}>Remove from Itinerary</button>
                <>
                    <button onClick={() => (handleDeleteStopTimeHour(props.index))}>-</button>
                    <button onClick={() => (handleAddStopTimeHour(props.index))}>+</button>
                </>
            </>)
        }

        const ItineraryRow = (props) => {
            if (props.index === 0) return <ItineraryPickUp address={props.address} stopTime={props.stopTime}/>;
            if (props.index === itineraries.length - 1) return <ItineraryDropOff address={props.address}
                                                                                 stopTime={props.stopTime}
                                                                                 travelTime={props.travelTime}/>;
            return <ItineraryRemovable address={props.address} stopTime={props.stopTime} index={props.index}
                                       travelTime={props.travelTime}/>;
        }

// TODO Need to add handleFormSubmit

        return (
            <>
                <Map
                    style={{width: '70vw', height: '70vh'}}
                    defaultCenter={{lat: 56.46913, lng: -2.97489}}
                    defaultZoom={8}
                    zoomControl={true}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={handleMarkerClick}
                >

                    {markers.map((marker) => (
                        <Marker
                            key={marker.index}
                            text={marker.name}
                            position={marker.position}
                            onClick={() => handleMarkerClick(marker)}
                        />
                    ))}
                    <InfoWindow position={activeMarker?.position} onCloseClick={handleInfoWindowClose}
                                visible={isInfoWindowOpen}>
                        <div>
                            <p>
                                {activeMarker?.name}
                                {activeMarker?.description}
                            </p>

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

                <Itinerary
                    totalTravelTime={totalTravelTime}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange}
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                />
            </>
        );
    }
;

export default MapComponent;
import React, {useEffect, useState} from 'react'
import {InfoWindow, Map, Marker, useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import '@react-google-maps/api'
import "../styles/MapComponent.css";
import Itinerary from "./Itinerary";
import LocationService from "../service/LocationService";
import ItineraryService from "../service/ItineraryService";
import ItineraryLocationService from "../service/ItineraryLocationService";
import useFetch from '../hooks/useFetch';
import bookingLocationService from "../service/BookingLocationService";


//https://www.npmjs.com/package/@vis.gl/react-google-maps?activeTab=readme
// https://stackoverflow.com/a/50549617

const MapComponent = () => {
        const map = useMap();
        const routesLibrary = useMapsLibrary('routes');
        // https://github.com/visgl/react-google-maps/blob/main/examples/directions/src/app.tsx#L98
        const [directionsService, setDirectionsService] = useState(null);
        const [directionsRenderer, setDirectionsRenderer] = useState(null);
        const [markers, setMarkers] = useState([])
        const [activeMarker, setActiveMarker] = useState(null);
        const [markerPositions, setMarkerPositions] = useState([]); // TODO maybe remove
        const [locationAddress, setLocationAddress] = useState('') // TODO maybe remove
        const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
        
        // Itninerary Data
    
        const currentDate = new Date().toISOString().slice(0, 16);
        const [selectedStartDate, setSelectedStartDate] = useState(currentDate)
        const [selectedEndDate, setSelectedEndDate] = useState(currentDate)
        const [itineraryLocations, setItineraryLocations] = useState([])
        const [itineraryLocationsTemp1, setItineraryLocationsTemp1] = useState([])
        const [itineraryNote, setItineraryNote] = useState('');
        const [totalTravelTime, setTotalTravelTime] = useState('0 hr and 0 min');

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

        const handleAddItineraryButtonClick = () => {
            const address = activeMarker.address

            const isAddressAlreadyAdded = itineraryLocationsTemp1.some((itinerary) => itinerary.address === address)
            if (isAddressAlreadyAdded) return;

            const newItinerary = activeMarker
            newItinerary.stopTime = 0;

            const insertAt = itineraryLocationsTemp1.length - 1;
            const newItineraryStops = [
                ...itineraryLocationsTemp1.slice(0, insertAt),
                newItinerary,
                ...itineraryLocationsTemp1.slice(insertAt)];

            setItineraryLocationsTemp1(newItineraryStops);
            handleInfoWindowClose();
        };

        const handleDeleteItineraryButtonClick = (index) => {
            const newItinerary = [...itineraryLocations];
            newItinerary.splice(index, 1);
            setItineraryLocationsTemp1(newItinerary);
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
            itineraryLocations[index].stopTime += 15;
            const newAddedTime = [...itineraryLocations];

            setItineraryLocations(newAddedTime)
        }

        const handleDeleteStopTimeHour = (index) => {
            if (itineraryLocations[index].stopTime === 0) return;
            itineraryLocations[index].stopTime -= 15;
            const newDeletedTime = [...itineraryLocations];
            setItineraryLocations(newDeletedTime)
        }

        const calcTotalTime = () => {
            let totalTimeSeconds = 0;

            itineraryLocations.forEach(itinerary => {
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
                console.log("useEffect that calls setMarkers");
                const response = await LocationService.getLocations();

                const newMarkers = response.map(location => ({
                    index: location.locationId,
                    position: {lat: JSON.parse(location.locationLat), lng: JSON.parse(location.locationLng)},
                    name: location.locationName,
                    address: location.address,
                    image: `images/${location.locationId}.jpeg`,
                    description: location.locationDescription
                }));

                setMarkers(newMarkers);
            })();
        }, []);

        useEffect(() => {
            (async () => {
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().slice(0, 10);
                const formattedTime = currentDate.toTimeString().slice(0, 8);

                try {
                    const baseItinerary = {
                        tripDate: formattedDate,
                        tripStartTime: formattedTime,
                        tripEndTime: formattedTime,
                        passengerCount: 1,
                        itineraryNotes: 'test notes',
                    };
                    console.log("The base itinerary: " + JSON.stringify(baseItinerary));

                    const newItinerary = await ItineraryService.createItinerary(baseItinerary);
                    console.log("This is the new Itinerary: " + JSON.stringify(newItinerary));
                    const pickUpLocation = await LocationService.getSpecificLocation(1);
                    console.log("Pick up location: " + JSON.stringify(pickUpLocation))
                    console.log("Pick up location id " + JSON.stringify(pickUpLocation.locationId))
                    console.log("New Itinerary, itinerary ID: " + JSON.stringify(newItinerary.itineraryId))
                    const pickUpItineraryLocation = {
                        itineraryId: newItinerary.itineraryId,
                        locationId: pickUpLocation.locationId,
                        stopOver: 0,
                        stopOrder: 1,
                        travelTimeNextLocale: 0,
                    };
                    console.log("Pick Up Itinerary Location: " + JSON.stringify(pickUpItineraryLocation));
                    const dropOffLocation = await LocationService.getSpecificLocation(2);
                    const dropOffItineraryLocation =
                        {
                            itineraryId: newItinerary.itineraryId,
                            locationId: dropOffLocation.locationId,
                            stopOver: 0,
                            stopOrder: 2,
                            travelTimeNextLocale: 0,
                        };

                    await Promise.all([
                        ItineraryLocationService.createItineraryLocation(pickUpItineraryLocation),
                        ItineraryLocationService.createItineraryLocation(dropOffItineraryLocation)
                    ])

                    // await ItineraryLocationService.createItineraryLocation(pickUpItineraryLocation);
                    // await ItineraryLocationService.createItineraryLocation(dropOffItineraryLocation);

                    setItineraryLocations(newItinerary);
                    console.log("This is the new itinerary: " + JSON.stringify(newItinerary));
                } catch (error) {
                    console.error('Error creating base itinerary:', error);
                }
            })();
        }, []);
        


// Use directions service
        useEffect(() => {
            if (!directionsRenderer) return;
            if (!directionsService) return;

            if (itineraryLocationsTemp1.length < 3) {
                setItineraryLocations(itineraryLocationsTemp1);
                return;
            }

            const origin = {location: {lat: itineraryLocationsTemp1[0].position.lat, lng: itineraryLocationsTemp1[0].position.lng}};
            const destination = {
                location: {
                    lat: itineraryLocationsTemp1[itineraryLocationsTemp1.length - 1].position.lat,
                    lng: itineraryLocationsTemp1[itineraryLocationsTemp1.length - 1].position.lng
                }
            };

            const waypoints = [];
            for (let i = 1; i < itineraryLocationsTemp1.length - 1; i++) {
                waypoints.push({location: {lat: itineraryLocationsTemp1[i].position.lat, lng: itineraryLocationsTemp1[i].position.lng}});
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
                        itineraryLocationsTemp1[i + 1].travelTime = legs[i].duration.text;
                        itineraryLocationsTemp1[i + 1].travelTimeValue = legs[i].duration.value;

                    }
                    setItineraryLocations(itineraryLocationsTemp1);
                    const totalTime = calcTotalTime();
                    setTotalTravelTime(totalTime);
                });

            return () => {
                directionsRenderer.setMap(null);
            }
        }, [itineraryLocationsTemp1]);

        // const setItineraryPickUp = async () => {
        //     const pickUpLocation = await LocationService.getSpecificLocation(1);
        //     setItinerary(pickUpLocation);
        // }
        //
        // // TODO Set this to setItineraryDropOff
        // const setItineraryDropOff = async () => {
        //     const dropOffLocation = await LocationService.getSpecificLocation(2);
        //     setItinerary(dropOffLocation);
        // }


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

        // const ItineraryRow = (props) => {
        //     if (props.index === 0) return <ItineraryPickUp address={props.address} stopTime={props.stopTime}/>;
        //     if (props.index === Itinerary.length - 1) return <ItineraryDropOff address={props.address}
        //                                                                          stopTime={props.stopTime}
        //                                                                          travelTime={props.travelTime}/>;
        //     return <ItineraryRemovable address={props.address} stopTime={props.stopTime} index={props.index}
        //                                travelTime={props.travelTime}/>;
        // }

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
                            <p className="info-window info-window-name">
                                {activeMarker?.name}
                            </p>
                            <img src={activeMarker?.image} alt="Image of location"
                                 className="info-window info-window-image"/>
                            <p className="info-window info-window-description">
                                {activeMarker?.description}
                            </p>
                            <div className="info-window">
                                <button className="info-window primary-button"
                                        onClick={handleAddItineraryButtonClick}>Add to Itinerary
                                </button>
                            </div>

                        </div>
                    </InfoWindow>

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
                    <h3>Itinerary Form</h3>
                    {/*{itinerary.length < 3 &&*/}
                    <p>To plan your itinerary, please explore the selection of destinations on the map. When you click
                        on a marker, it will open an info window describing the location. You acn then add the location
                        to the itinerary. Please add a starting date and time. Feel free to add an amount of time you
                        would like to stop over at that location. The total journey time will automatically be
                        calculated. The pick-up and drop-off location are already determined. Feel free to add any other
                        destination you would like.</p>
                    {/*}*/}
                    {/*{}*/}
                    {/*{Itinerary.map((itinerary, index) => (*/}
                    {/*    <ItineraryRow*/}
                    {/*        index={index}*/}
                    {/*        address={itinerary.address}*/}
                    {/*        stopTime={itinerary.stopTime}*/}
                    {/*        travelTime={itinerary.travelTime}*/}
                    {/*    />*/}
                    {/*))}*/}

                    {}
                </div>

                {/*//TODO Pass Itinerary down the chain*/}
                <Itinerary
                    totalTravelTime={totalTravelTime}
                    handleStartDateChange={handleStartDateChange}
                    handleEndDateChange={handleEndDateChange}
                    selectedStartDate={selectedStartDate}
                    selectedEndDate={selectedEndDate}
                    itineraryLocations={itineraryLocations}
                    itineraryNote={itineraryNote}
                />
            </>
        );
    }
;

export default MapComponent;
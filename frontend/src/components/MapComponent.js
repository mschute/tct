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
        const [ itineraryDTO , setItineraryDTO] = useState({
            tripDate: currentDate.slice(0, 10),
            tripStartTime: currentDate.slice(10, 8),
            tripEndTime: currentDate.slice(10, 8),
            customerName: "Your Name",
            passengerCount: 1,
            locations: [
                {
                    index: 1,
                    position: {lat: 56.49220796, lng: -2.908221236},
                    name: "Pick-up Location",
                    address: "18 Ballumbie Pl",
                    stopOver: 0,
                    stopOrders: 0,
                    travelTimeNextLocale: 0
                },
                {
                    index: 2,
                    position: {lat: 56.45797839, lng: -2.967002642},
                    name: "Drop-off Location",
                    address: "1 Riverside Esplanade, Dundee DD1 4EZ",
                    stopOver: 0,
                    stopOrders: 0,
                    travelTimeNextLocale: 0
                }
            ],
            itineraryNotes: 'test notes',
            totalTravelTime: 0
        });
        const [locations, setLocations] = useState([])

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
            const isAddressAlreadyAdded = locations.some((locations) => locations.address === activeMarker.address)
            if (isAddressAlreadyAdded) {
                return;
            } 

            const insertAt = locations.length - 1;
            const newLocation = {
                index: activeMarker.index,
                position: activeMarker.position,
                name: activeMarker.locationName,
                address: activeMarker.address,
                stopOver: 0,
                stopOrders: insertAt,
                travelTimeNextLocale: 0
            }
            
            setLocations([...locations.slice(0, insertAt), newLocation, ...locations.slice(insertAt)]);
            handleInfoWindowClose();
        };

        const handleDeleteItineraryButtonClick = (index) => {
            locations.splice(index, 1);
            setLocations(locations);
        }

        // const handleStartDateChange = (event) => {
        //     const {value} = event.target;
        //     setSelectedStartDate(value);
        // }

        // const handleEndDateChange = (event) => {
        //     const {value} = event.target
        //     setSelectedEndDate(value);
        // }

        const handleAddStopTimeHour = (index) => {
            itineraryDTO.locations[index].stopOver += 15;
            setItineraryDTO(itineraryDTO);
        }

        const handleDeleteStopTimeHour = (index) => {
            if (itineraryDTO.locations[index].stopOver === 0) {
                return;
            }
            itineraryDTO.locations[index].stopOver -= 15;
            setItineraryDTO(itineraryDTO);
        }
        
        const handleRouteUpdate = (event) => {
            const {value} = event.target;
            setLocations(value);
        }

        const handleTripDateChange = (event) => {
            const {value} = event.target;
            itineraryDTO.tripDate = value;
            setItineraryDTO(itineraryDTO);
        }

        const handleStartTimeChange = (event) => {
            const {value} = event.target;
            itineraryDTO.tripStartTime = value;
            setItineraryDTO(itineraryDTO);
        }

        const handleEndTimeChange = (event) => {
            const {value} = event.target;
            itineraryDTO.tripEndTime = value;
            setItineraryDTO(itineraryDTO);
        }

        const calcTotalTime = (locations) => {
            let totalTimeSeconds = 0;

            locations.forEach(location => {
                totalTimeSeconds += location.stopOver * 60 || 0;

                if (location.travelTimeNextLocale) {
                    totalTimeSeconds += location.travelTimeNextLocale;
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

                if (locations.length === 0)
                {
                    setLocations([
                        {
                            index: newMarkers[0].index,
                            position: newMarkers[0].position,
                            name: newMarkers[0].locationName,
                            address: newMarkers[0].address,
                            stopOver: 0,
                            stopOrders: 0,
                            travelTimeNextLocale: 0
                        },
                        {
                            index: newMarkers[1].index,
                            position: newMarkers[1].position,
                            name: newMarkers[1].locationName,
                            address: newMarkers[1].address,
                            stopOver: 0,
                            stopOrders: 0,
                            travelTimeNextLocale: 0
                        }
                    ]);
                }
            })();
        }, []);
        
        useEffect(() => {
            if (!directionsRenderer) return;
            if (!directionsService) return;

            if (locations.length < 3) {
                itineraryDTO.locations = locations;
                setItineraryDTO(itineraryDTO);
                return;
            }

            const origin = {location: {lat: locations[0].position.lat, lng: locations[0].position.lng}};
            const destination = {
                location: {
                    lat: locations[locations.length - 1].position.lat,
                    lng: locations[locations.length - 1].position.lng
                }
            };

            const waypoints = [];
            for (let i = 1; i < locations.length - 1; i++) {
                waypoints.push({location: {lat: locations[i].position.lat, lng: locations[i].position.lng}});
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
                        // locations[i + 1].travelTimeText = legs[i].duration.text;
                        locations[i + 1].travelTimeNextLocale = legs[i].duration.value;
                    }
                    itineraryDTO.locations = locations;
                    itineraryDTO.totalTravelTime = calcTotalTime(locations);
                    setItineraryDTO(itineraryDTO);
                });

            return () => {
                directionsRenderer.setMap(null);
            }
        }, [locations]);

        const ItineraryRemovable = (props) => {
            return (<>
                <p>Via {props.address} travel-time={props.travelTime} stopTime={props.stopOver} mins</p>
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
                    // totalTravelTime={totalTravelTime}
                    // handleStartDateChange={handleStartDateChange}
                    // handleEndDateChange={handleEndDateChange}
                    // selectedStartDate={selectedStartDate}
                    // selectedEndDate={selectedEndDate}
                    // itineraryLocations={itineraryLocations}
                    // itineraryNote={itineraryNote}
                    itineraryDTO={itineraryDTO}
                    handleRouteUpdate={handleRouteUpdate}
                    handleTripDateChange={handleTripDateChange}
                    handleStartTimeChange={handleStartTimeChange}
                    handleEndTimeChange={handleEndTimeChange}
                />
            </>
        );
    }
;

export default MapComponent;
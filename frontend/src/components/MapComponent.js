import React, {useEffect, useState} from 'react'
import {InfoWindow, Map, Marker, useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import '@react-google-maps/api'
import "../styles/MapComponent.css";
import "../styles/itinerary-form-style.css"
import Itinerary from "./Itinerary";
import LocationService from "../service/LocationService";


//https://www.npmjs.com/package/@vis.gl/react-google-maps?activeTab=readme
// https://stackoverflow.com/a/50549617

const MapComponent = ({isAuthenticated}) => {
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

    // Itinerary Data
    const currentDate = new Date().toISOString().slice(0, 16);

    const [itineraryDTO, setItineraryDTO] = useState({
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
        itineraryNotes: ' ',
        totalTravelTime: 0
    });
    const [locations, setLocations] = useState([])

    const handleMarkerClick = (marker) => {
        setIsInfoWindowOpen(true);
        setActiveMarker(marker);
    };

    const handleInfoWindowClose = () => {
        setActiveMarker(null)
        setIsInfoWindowOpen(false);
    };

    const handleNoteChange = (event) => {
        const newNote = event.target.value;
        setItineraryDTO(note => ({
            ...note,
            itineraryNotes: newNote
        }));
    };

    const handleAddItineraryButtonClick = () => {
        const isAddressAlreadyAdded = itineraryDTO.locations.some((location) => location.index === activeMarker.index)
        if (isAddressAlreadyAdded) {
            return;
        }

        const insertAt = itineraryDTO.locations.length - 1;
        const newLocation = {
            index: activeMarker.index,
            position: activeMarker.position,
            name: activeMarker.name,
            address: activeMarker.address,
            stopOver: 0,
            stopOrders: 0,
            travelTimeNextLocale: 0
        }
        const newLocations = [...itineraryDTO.locations.slice(0, insertAt), newLocation, ...itineraryDTO.locations.slice(insertAt)]

        for (let i = 0; i < newLocations.length; i++) {
            newLocations[i].stopOrders = i + 1;
        }

        setLocations(newLocations);
        handleInfoWindowClose();
    };

    const handleDeleteItineraryButtonClick = (index) => {
        const newLocations = [...itineraryDTO.locations];
        newLocations.splice(index, 1);

        for (let i = 0; i < newLocations.length; i++) {
            newLocations[i].stopOrders = i + 1;
        }
        setLocations(newLocations);
    }

    const handleStopTime = (event, index) => {
        const newLocations = locations.map((location, idx) => {
            if (idx === index) {
                const newStopOver = parseInt(event.target.value);
                return {...location, stopOver: newStopOver};
            }
            return location;
        })

        const totalTravelTime = calcTotalTime(newLocations);

        setLocations(newLocations);
        setItineraryDTO({...itineraryDTO, totalTravelTime, locations: newLocations});
    }

    // TODO not tested
    const handleRouteUpdate = (event) => {
        console.log("handleRouteUpdate event.target.value=" + event.target.value);
        const locations = event.target.value;
        setLocations(locations);
    }

    const handleTripDateChange = (event) => {
        const tripDate = event.target.value;
        setItineraryDTO({...itineraryDTO, tripDate});
    }

    const handleStartTimeChange = (event) => {
        const tripStartTime = event.target.value;
        setItineraryDTO({...itineraryDTO, tripStartTime});
    }

    function calcTotalTime(locations) {
        let totalTimeSeconds = 0;

        locations.forEach(location => {
            totalTimeSeconds += location.stopOver * 60;

            if (location.travelTimeNextLocale) {
                totalTimeSeconds += location.travelTimeNextLocale;
            }
        });
        console.log("Total time seconds: " + totalTimeSeconds);
        return totalTimeSeconds
    }

    function calcEndTimeChange(tripStartTime, totalTravelTime) {
        const [startHours, startMinutes] = tripStartTime.split(':').map(Number);
        const startTimeInSeconds = (startHours * 3600) + (startMinutes * 60);
        const parsedTravelTime = parseInt(totalTravelTime);

        return startTimeInSeconds + parsedTravelTime;
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
            console.log("useEffect []]");
            const response = await LocationService.getLocations();

            const newMarkers = response.map(location => ({
                index: location.locationId,
                position: {lat: JSON.parse(location.locationLat), lng: JSON.parse(location.locationLng)},
                name: location.locationName,
                address: location.locationAddress,
                image: `images/${location.locationId}.jpeg`,
                description: location.locationDescription
            }));

            setMarkers(newMarkers);
        })();
    }, []);

    useEffect(() => {
        console.log("useEffect [locations] \nlocations=" + JSON.stringify(locations) + "\nitineraryDTO.locations=" + JSON.stringify(itineraryDTO.locations));
        if (!directionsRenderer) return;
        if (!directionsService) return;

        if (locations.length < 3) {
            setItineraryDTO({...itineraryDTO, locations});
            return;
        }

        const origin = {
            location: {
                lat: locations[0].position.lat,
                lng: locations[0].position.lng
            }
        };

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

                const totalTravelTime = calcTotalTime(locations);
                const tripEndTime = calcEndTimeChange(itineraryDTO.tripStartTime, totalTravelTime);
                setItineraryDTO({...itineraryDTO, locations, totalTravelTime, tripEndTime});
            });

        return () => {
            directionsRenderer.setMap(null);
        }
    }, [locations]);

    return (
        <>
            <p className="google-map">
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
            </p>
            <div className="itinerary-header">
                <p>To plan your itinerary, please explore the selection of destinations on the map. When you click
                    on a marker, it will open an info window describing the location. You can then add the location
                    to the itinerary. Please add a starting date and time. Feel free to add an amount of time you
                    would like to stop over at that location. The total journey time will automatically be
                    calculated. The pick-up and drop-off location are already determined. Feel free to add any other
                    destination you would like.</p>
                {}
                {isAuthenticated ? " " : <p className="sign-in-warning">Please sign-in to submit your itinerary </p>}
            </div>

            <Itinerary
                itineraryDTO={itineraryDTO}
                handleRouteUpdate={handleRouteUpdate}
                handleTripDateChange={handleTripDateChange}
                handleStartTimeChange={handleStartTimeChange}
                handleDeleteItineraryButtonClick={handleDeleteItineraryButtonClick}
                handleStopTime={handleStopTime}
                handleNoteChange={handleNoteChange}
                isAuthenticated={isAuthenticated}
            />
        </>
    );
};

export default MapComponent;
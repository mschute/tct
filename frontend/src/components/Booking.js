import React, { useState, useEffect } from 'react';
import List from "./List";
import Form from "./Form";
import Details from "./Details";
import vehicleService from "../service/VehicleService";
import customerService from "../service/CustomerService";
import driverService from "../service/DriverService";
import locationService from "../service/LocationService";
import service from "../service/BookingService";
import bookingLocationService from "../service/BookingLocationService";
import "../styles/table.css";

const Bookings = ({jwtToken}) => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [editingBooking, setEditingBooking] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const modelName = "Booking";

    useEffect(() => {
        // Fetch bookings data when component mounts
        fetchBookings(jwtToken);
        fetchVehicles(jwtToken);
        fetchCustomers(jwtToken);
        fetchDrivers(jwtToken);
        fetchLocations(jwtToken);
    }, []);

    const fetchBookings = async () => {
        try {
            const bookingsData = await service.getBookings(jwtToken);
            setSelectedBooking(null);
            setEditingBooking(null);
            setBookings(bookingsData);
            
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchVehicles = async () => {
        try {
            const vehiclesData = await vehicleService.getVehicles(jwtToken);
            setVehicles(vehiclesData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const fetchCustomers = async () => {
        try {
            const customersData = await customerService.getCustomers(jwtToken);
            setCustomers(customersData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const fetchDrivers = async () => {
        try {
            const driversData = await driverService.getDrivers(jwtToken);
            setDrivers(driversData);
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

    const handleEdit = (bookingId) => {
        const selected = bookings.find((booking) => booking.bookingId === bookingId);
        setSelectedBooking(null);
        
        setEditingBooking({ bookingId: selected.bookingId, totalPrice: selected.totalPrice, tripDate: selected.tripDate, tripStartTime: selected.tripStartTime, tripEndTime: selected.tripEndTime, vehicleId: selected.vehicleId, driverId: selected.driverId, customerId: selected.customerId, locationIds: selected.locationIds, bookingNotes: selected.bookingNotes});
    };

    const handleDelete = async (bookingId) => {
        try {
            await service.deleteBooking(bookingId, jwtToken)
            fetchBookings(jwtToken);
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    const handleViewDetails = (bookingId) => {
        const selected = bookings.find((booking) => booking.bookingId === bookingId);
        setSelectedBooking(selected);
        setEditingBooking(null);
    };

    const handleCreate = () => {
        setSelectedBooking(null);
        setEditingBooking({ bookingId: '', totalPrice: '', tripDate: '', tripStartTime: '', tripEndTime: '', vehicleId: '', driverId: '', customerId: '', locationIds: '', bookingNotes: '' });
        setIsFormOpen(true)
    };

    const handleCancelEdit = () => {
        setEditingBooking(null);
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editingBooking) {
                if (editingBooking.bookingId) {
                    //TODO Need to extract booking location logic out
                    console.log('Updating existing booking:', editingBooking);
                    
                    editingBooking.tripStartTime += ":00"
                    editingBooking.tripEndTime += ":00"
                    
                    await service.updateBooking(editingBooking.bookingId, editingBooking, jwtToken);
                    
                    const existingBookingLocations = await bookingLocationService.getSpecificBookingLocation(editingBooking.bookingId, jwtToken);

                    const existingLocationIds = existingBookingLocations.map(location => location.locationId);
                    
                    const locationsToAdd = editingBooking.locationIds.filter(locationId => !existingLocationIds.includes(locationId));
                    const locationsToRemove = existingLocationIds.filter(locationId => !editingBooking.locationIds.includes(locationId));
                    
                    const createBookingLocationPromises = locationsToAdd.map(locationId => {
                        const newBookingLocation = { bookingId: editingBooking.bookingId, locationId };
                        return bookingLocationService.createBookingLocation(newBookingLocation, jwtToken);
                    });

                    const deleteBookingLocationPromises = locationsToRemove.map(locationId => {
                        const bookingLocation = existingBookingLocations.find(location => location.locationId === locationId);
                        if (bookingLocation) {
                            return bookingLocationService.deleteBookingLocation(editingBooking.bookingId, locationId, jwtToken);
                        }
                    });

                    await Promise.all([...createBookingLocationPromises, ...deleteBookingLocationPromises]);

                } else {
                    //TODO Need to extract booking location logic out
                    const { bookingId, ...newBooking } = editingBooking;

                    const createdBooking = await service.createBooking(newBooking, jwtToken);
                    
                    const _bookingId = createdBooking.bookingId;
                    const _locationIds = newBooking.locationIds;

                    const createBookingLocationPromise = _locationIds.map((location) => {
                        const newBookingLocation = { bookingId: _bookingId, locationId: location };
                        return bookingLocationService.createBookingLocation(newBookingLocation, jwtToken);
                    });
                    
                    await Promise.all(createBookingLocationPromise);
                }
                fetchBookings(jwtToken);
            }
        } catch (error) {
            console.error('Error saving booking:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingBooking(null);
            setIsFormOpen(false);
        }
    };

    return (
        <div>
            <List model={bookings} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedBooking && <Details model={selectedBooking} modelName={modelName} />}
            {editingBooking && (
                <Form
                    fields={[
                        {name:"bookingID", label: "Booking ID", value:editingBooking.bookingId, type:"text", disabled:true, min: null, step: null},
                        {name:"totalPrice", label: "Total Price", value:editingBooking.totalPrice, type:"number", disabled:false, min: 0, step: 10},
                        {name:"tripDate", label: "Trip Date", value:editingBooking.tripDate, type:"date", disabled:false, min: null, step: null},
                        {name:"tripStartTime", label: "Trip Start Time", value:editingBooking.tripStartTime, type:"time", disabled:false, min: null, step: null},
                        {name:"tripEndTime", label: "Trip End Time", value:editingBooking.tripEndTime, type:"time", disabled:false, min: null, step: null},
                        {name:"vehicleId", label: "Vehicle", value:editingBooking.vehicleId, type:"select", disabled:false, min: null, step: null, options: vehicles},
                        {name:"driverId", label: "Driver", value:editingBooking.driverId, type:"select", disabled:false, min: null, step: null, options: drivers},
                        {name:"customerId", label: "Customer", value:editingBooking.customerId, type:"select", disabled:false, min: null, step: null, options: customers},
                        {name:"locationIds", label: "Location(s)", value:editingBooking.locationIds, type:"select", disabled:false, min: null, step: null, options: locations},
                        {name:"bookingNotes", label: "Booking Notes", value:editingBooking.bookingNotes, type:"text", disabled:false},
                    ]}
                    model={editingBooking}
                    modelName={modelName}
                    handleInputChange={(event) => {
                        const { name, value } = event.target;
                        if (name === 'locationIds') {
                            const selectedLocations = Array.from(event.target.selectedOptions, option => parseInt(option.value));
                            setEditingBooking({...editingBooking, [name]: selectedLocations});
                        } else {
                            setEditingBooking({...editingBooking, [name]: value });
                        }
                    }}
                    
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            {isFormOpen===true ? "" : (<button className="primary-button" onClick={handleCreate}>Add new</button>)}
        </div>
    );
};

export default Bookings;
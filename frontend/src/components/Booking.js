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

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [editingBooking, setEditingBooking] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [locations, setLocations] = useState([]);
    const modelName = "Booking";

    useEffect(() => {
        // Fetch bookings data when component mounts
        fetchBookings();
        fetchVehicles();
        fetchCustomers();
        fetchDrivers();
        fetchLocations();
    }, []);

    const fetchBookings = async () => {
        try {
            const bookingsData = await service.getBookings();
            setSelectedBooking(null);
            setEditingBooking(null);
            setBookings(bookingsData);
            
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchVehicles = async () => {
        try {
            const vehiclesData = await vehicleService.getVehicles();
            setVehicles(vehiclesData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const fetchCustomers = async () => {
        try {
            const customersData = await customerService.getCustomers();
            setCustomers(customersData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const fetchDrivers = async () => {
        try {
            const driversData = await driverService.getDrivers();
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
        console.log('Edit button clicked for booking bookingId:', bookingId);
        const selected = bookings.find((booking) => booking.bookingId === bookingId);
        console.log('Selected booking:', selected);
        setSelectedBooking(null);

        // Ensure that the property names match the expected format
        setEditingBooking({ bookingId: selected.bookingId, totalPrice: selected.totalPrice, date: selected.date, vehicleId: selected.vehicleId, driverId: selected.driverId, customerId: selected.customerId, locationIds: selected.locationIds});
    };

    const handleDelete = async (bookingId) => {
        try {
            await service.deleteBooking(bookingId)
            fetchBookings();
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
        setEditingBooking({ bookingId: '', totalPrice: '', date: '', vehicleId: '', driverId: '', customerId: '', locationIds: '' });
    };

    const handleCancelEdit = () => {
        setEditingBooking(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Booking:', editingBooking);

            if (editingBooking) {
                if (editingBooking.bookingId) {
                    console.log('Updating existing booking:', editingBooking);
                    await service.updateBooking(editingBooking.bookingId, editingBooking);

                } else {
                    // Remove the existing bookingId property for new bookings
                    const { bookingId, ...newBooking } = editingBooking;

                    const createdBooking = await service.createBooking(newBooking);
                    
                    const _bookingId = createdBooking.bookingId;
                    const _locationIds = newBooking.locationIds;

                    const createBookingLocationPromise = _locationIds.map((location) => {
                        const newBookingLocation = { bookingId: _bookingId, locationId: location };
                        return bookingLocationService.createBookingLocation(newBookingLocation);
                    });
                    
                    await Promise.all(createBookingLocationPromise);
                }
                fetchBookings();
            }
        } catch (error) {
            console.error('Error saving booking:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingBooking(null);
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
                        {name:"totalPrice", label: "Total Price", value:editingBooking.totalPrice, type:"number", disabled:false, min: 50, step: 15},
                        {name:"date", label: "Date", value:editingBooking.date, type:"datetime-local", disabled:false, min: null, step: null},
                        {name:"vehicleId", label: "Vehicle", value:editingBooking.vehicleId, type:"select", disabled:false, min: null, step: null, options: vehicles},
                        {name:"driverId", label: "Driver", value:editingBooking.driverId, type:"select", disabled:false, min: null, step: null, options: drivers},
                        {name:"customerId", label: "Customer", value:editingBooking.customerId, type:"select", disabled:false, min: null, step: null, options: customers},
                        {name:"locationIds", label: "Location(s)", value:editingBooking.locationIds, type:"select", disabled:false, min: null, step: null, options: locations},
                    ]}
                    model={editingBooking}
                    modelName={modelName}
                    handleInputChange={(e) => {
                        const { name, value } = e.target;
                        if (name === 'locationIds') {
                            const selectedLocations = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                            setEditingBooking({...editingBooking, [name]: selectedLocations});
                        } else {
                            setEditingBooking({...editingBooking, [name]: value });
                        }
                    }}
                    
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            <button onClick={handleCreate}>Add new</button>
        </div>
    );
};

export default Bookings;
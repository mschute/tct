import React, {useState, useEffect} from 'react';
import List from "./List";
import Form from "./Form";
import vehicleService from "../service/VehicleService";
import customerService from "../service/CustomerService";
import driverService from "../service/DriverService";
import locationService from "../service/LocationService";
import service from "../service/BookingService";
import bookingLocationService from "../service/BookingLocationService";
import "../styles/table.css";
import {
    validateNotEmpty,
    validateLocations,
    validateSelection,
    validateDate,
    validateTime,
    validateTimeDifference,
    validatePrice
} from "../helpers/validation";
import {calculateTomorrow} from "../helpers/helpers";

const Bookings = ({jwtToken}) => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [editingBooking, setEditingBooking] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const modelName = "Booking";

    useEffect(() => {
        fetchBookings(jwtToken);
        fetchVehicles(jwtToken);
        fetchCustomers(jwtToken);
        fetchDrivers(jwtToken);
        fetchLocations(jwtToken);
    }, []);

    const clearErrorMessage = () => {
        setErrorMessage('');
    }
    
    const fetchBookings = async () => {
        try {
            const bookingsData = await service.getBookings(jwtToken);
            setSelectedBooking(null);
            setEditingBooking(null);
            setBookings(bookingsData);
            clearErrorMessage();
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
        setIsFormOpen(true);

        setEditingBooking({
            bookingId: selected.bookingId,
            totalPrice: selected.totalPrice,
            tripDate: selected.tripDate,
            tripStartTime: selected.tripStartTime,
            tripEndTime: selected.tripEndTime,
            vehicleId: selected.vehicleId,
            driverId: selected.driverId,
            customerId: selected.customerId,
            locationIds: selected.locationIds,
            bookingNotes: selected.bookingNotes
        });
    };

    const handleDelete = async (bookingId) => {
        try {
            await service.deleteBooking(bookingId, jwtToken)
            fetchBookings(jwtToken);
            clearErrorMessage();
        } catch (error) {
            setErrorMessage('Error deleting booking. Please try again.');
        }
    };

    const handleCreate = () => {
        setSelectedBooking(null);
        setEditingBooking({
            bookingId: '',
            totalPrice: '',
            tripDate: '',
            tripStartTime: '',
            tripEndTime: '',
            vehicleId: '',
            driverId: '',
            customerId: '',
            locationIds: '',
            bookingNotes: ''
        });
        setIsFormOpen(true)
    };

    const handleCancelEdit = () => {
        setEditingBooking(null);
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            clearErrorMessage();
            
            if (editingBooking) {
                let error = validatePrice("Total Price", editingBooking.totalPrice);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                error = validateDate("Trip Date", editingBooking.tripDate);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                error = validateTime("Start Time", editingBooking.tripStartTime);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }

                error = validateTime("End Time", editingBooking.tripEndTime);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                error = validateTimeDifference("Start Time", "End Time", editingBooking.tripStartTime, editingBooking.tripEndTime);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                error = validateSelection("Vehicle", editingBooking.vehicleId);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                error = validateSelection("Driver", editingBooking.driverId);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                error = validateSelection("Customer", editingBooking.customerId);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                error = validateLocations("Locations", editingBooking.locationIds);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                error = validateNotEmpty("Booking notes", editingBooking.bookingNotes);
                if (error !== "") {
                    setErrorMessage(error);
                    return;
                }
                
                if (editingBooking.bookingId) {

                    editingBooking.tripStartTime += ":00"
                    editingBooking.tripEndTime += ":00"

                    await service.updateBooking(editingBooking.bookingId, editingBooking, jwtToken);

                    const existingBookingLocations = await bookingLocationService.getSpecificBookingLocation(editingBooking.bookingId, jwtToken);

                    const existingLocationIds = existingBookingLocations.map(location => location.locationId);

                    const locationsToAdd = editingBooking.locationIds.filter(locationId => !existingLocationIds.includes(locationId));
                    const locationsToRemove = existingLocationIds.filter(locationId => !editingBooking.locationIds.includes(locationId));

                    const createBookingLocationPromises = locationsToAdd.map(locationId => {
                        const newBookingLocation = {bookingId: editingBooking.bookingId, locationId};
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
                    const {bookingId, ...newBooking} = editingBooking;

                    newBooking.tripStartTime += ":00"
                    newBooking.tripEndTime += ":00"

                    const createdBooking = await service.createBooking(newBooking, jwtToken);

                    const _bookingId = createdBooking.bookingId;
                    const _locationIds = newBooking.locationIds;

                    const createBookingLocationPromise = _locationIds.map((location) => {
                        const newBookingLocation = {bookingId: _bookingId, locationId: location};
                        return bookingLocationService.createBookingLocation(newBookingLocation, jwtToken);
                    });

                    await Promise.all(createBookingLocationPromise);
                }
                await fetchBookings(jwtToken);
                setEditingBooking(null);
                setIsFormOpen(false);
            }
        } catch (error) {
            setErrorMessage('Error saving booking. Please try again.');
        }
    };

    return (
        <div>
            <List model={bookings} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete}/>
            {editingBooking && (
                <Form
                    fields={[
                        {
                            name: "bookingID",
                            label: "Booking ID",
                            value: editingBooking.bookingId,
                            type: "text",
                            disabled: true,
                        },
                        {
                            name: "totalPrice",
                            label: "Total Price",
                            value: editingBooking.totalPrice,
                            type: "number",
                            disabled: false,
                            min: 50,
                            step: 10
                        },
                        {
                            name: "tripDate",
                            label: "Trip Date",
                            value: editingBooking.tripDate,
                            type: "date",
                            disabled: false,
                            min: calculateTomorrow(),
                        },
                        {
                            name: "tripStartTime",
                            label: "Trip Start Time",
                            value: editingBooking.tripStartTime,
                            type: "time",
                            disabled: false,
                        },
                        {
                            name: "tripEndTime",
                            label: "Trip End Time",
                            value: editingBooking.tripEndTime,
                            type: "time",
                            disabled: false,
                        },
                        {
                            name: "vehicleId",
                            label: "Vehicle",
                            value: editingBooking.vehicleId,
                            type: "select",
                            disabled: false,
                            options: vehicles
                        },
                        {
                            name: "driverId",
                            label: "Driver",
                            value: editingBooking.driverId,
                            type: "select",
                            disabled: false,
                            options: drivers
                        },
                        {
                            name: "customerId",
                            label: "Customer",
                            value: editingBooking.customerId,
                            type: "select",
                            disabled: false,
                            options: customers
                        },
                        {
                            name: "locationIds",
                            label: "Location(s)",
                            value: editingBooking.locationIds,
                            type: "select",
                            disabled: false,
                            options: locations
                        },
                        {
                            name: "bookingNotes",
                            label: "Booking Notes",
                            value: editingBooking.bookingNotes,
                            type: "text",
                            disabled: false
                        },
                    ]}
                    model={editingBooking}
                    modelName={modelName}
                    handleInputChange={(event) => {
                        const {name, value} = event.target;
                        if (name === 'locationIds') {
                            const selectedLocations = Array.from(event.target.selectedOptions, option => parseInt(option.value));
                            setEditingBooking({...editingBooking, [name]: selectedLocations});
                        } else {
                            setEditingBooking({...editingBooking, [name]: value});
                        }
                    }}

                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {isFormOpen === true ? "" : (<button className="primary-button" onClick={handleCreate}>Add new</button>)}
        </div>
    );
};

export default Bookings;
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
import ViewList from "./ViewList";

const BookingSpecific = ({jwtToken, activeCustomerId}) => {
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
        fetchBookings(activeCustomerId, jwtToken);
        fetchVehicles(jwtToken);
        fetchCustomers(jwtToken);
        fetchDrivers(jwtToken);
        fetchLocations(jwtToken);
    }, []);

    const fetchBookings = async () => {
        try {
            const bookingsData = await service.getBookingsByCustomer(activeCustomerId, jwtToken);
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

    return (
        <div>
            <ViewList model={bookings} modelName={modelName} />
            {selectedBooking && <Details model={selectedBooking} modelName={modelName} />}
            {editingBooking && (
                <Form
                    fields={[
                        {name:"bookingID", label: "Booking ID", value:editingBooking.bookingId, type:"text", disabled:true},
                        {name:"totalPrice", label: "Total Price", value:editingBooking.totalPrice, type:"number", disabled:false},
                        {name:"tripDate", label: "Trip Date", value:editingBooking.tripDate, type:"date", disabled:false},
                        {name:"tripStartTime", label: "Trip Start Time", value:editingBooking.tripStartTime, type:"time", disabled:false},
                        {name:"tripEndTime", label: "Trip End Time", value:editingBooking.tripEndTime, type:"time", disabled:false},
                        {name:"vehicleId", label: "Vehicle", value:editingBooking.vehicleId, type:"select", disabled:false},
                        {name:"driverId", label: "Driver", value:editingBooking.driverId, type:"select", disabled:false, options: drivers},
                        {name:"customerId", label: "Customer", value:editingBooking.customerId, type:"select", disabled:false, options: customers},
                        {name:"locationIds", label: "Location(s)", value:editingBooking.locationIds, type:"select", disabled:false, options: locations},
                        {name:"bookingNotes", label: "Booking Notes", value:editingBooking.bookingNotes, type:"text", disabled:false},
                    ]}
                    model={editingBooking}
                    modelName={modelName}
                />
            )}
        </div>
    );
};

export default BookingSpecific;
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
    const modelName = "Confirmed Bookings";

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
            <List model={bookings} modelName={modelName} />
        </div>
    );
};

export default BookingSpecific;
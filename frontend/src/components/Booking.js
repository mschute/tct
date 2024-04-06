import React, { useState, useEffect } from 'react';
import List from "./List";
import Form from "./Form";
import Details from "./Details";
import vehicleService from "../service/VehicleService";
import customerService from "../service/CustomerService";
import driverService from "../service/DriverService";
import service from "../service/BookingService";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [editingBooking, setEditingBooking] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const modelName = "Booking";

    useEffect(() => {
        // Fetch bookings data when component mounts
        fetchBookings();
        fetchVehicles();
        fetchCustomers();
        fetchDrivers();
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

    const handleEdit = (bookingId) => {
        console.log('Edit button clicked for booking bookingId:', bookingId);
        const selected = bookings.find((booking) => booking.bookingId === bookingId);
        console.log('Selected booking:', selected);
        setSelectedBooking(null);

        // Ensure that the property names match the expected format
        setEditingBooking({ bookingId: selected.bookingId, totalPrice: selected.totalPrice, date: selected.date, vehicleId: selected.vehicleId, driverId: selected.driverId, customerId: selected.customerId});
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
        setEditingBooking({ bookingId: '', totalPrice: '', date: '', vehicleId: '', driverId: '', customerId: '' });
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
                    console.log('Creating new booking:', newBooking);
                    await service.createBooking(newBooking);
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
                        {name:ID, value:selectedBooking.bookingId, type:"text", disabled:true},
                        {name:ID, value:selectedBooking.totalPrice, type:"text", disabled:true},
                        {name:ID, value:selectedBooking.date, type:"text", disabled:true},
                        {name:ID, value:selectedBooking.vehicleId, type:"text", disabled:true},
                        {name:ID, value:selectedBooking.driverId, type:"text", disabled:true},
                        {name:ID, value:selectedBooking.customerId, type:"text", disabled:true},
                    ]}
                    model={editingBooking}
                    modelName={modelName}
                    vehicles={vehicles}
                    customers={customers}
                    drivers={drivers}
                    handleInputChange={(e) => setEditingBooking({ ...editingBooking, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            <button onClick={handleCreate}>Add new</button>
        </div>
    );
};

export default Bookings;
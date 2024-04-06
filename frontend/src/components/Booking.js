import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig.js';
import List from "./List";
import Form from "./Form";
import Details from "./Details";

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
            const response = await axios.get(`${API_BASE_URL}Booking`);
            console.log("This is the response for fetch booking: " + response)
            setBookings(response.data);
            setSelectedBooking(null);
            setEditingBooking(null);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };
    
    const fetchVehicles = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}Vehicles`)
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    }

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}Customers`)
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    }

    const fetchDrivers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}Drivers`)
            setDrivers(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
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
            await axios.delete(`${API_BASE_URL}Booking/${bookingId}`);
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
                    await axios.put(`${API_BASE_URL}Booking/${editingBooking.bookingId}`, editingBooking);

                } else {
                    // Remove the existing bookingId property for new bookings
                    const { bookingId, ...newBooking } = editingBooking;
                    console.log('Creating new booking:', newBooking);
                    await axios.post(`${API_BASE_URL}Booking`, newBooking);
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
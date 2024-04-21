import React, {useState, useEffect} from 'react';
import List from "./List";
import service from "../service/BookingService";
import "../styles/table.css";

const BookingSpecific = ({jwtToken, activeCustomerId}) => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [editingBooking, setEditingBooking] = useState(null);
    const modelName = "Confirmed Bookings";

    useEffect(() => {
        fetchBookings(activeCustomerId, jwtToken);
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

    return (
        <div>
            <List model={bookings} modelName={modelName}/>
        </div>
    );
};

export default BookingSpecific;
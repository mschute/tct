import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Booking from "./Booking";
import Vehicles from "./Vehicle";
import Locations from "./Location";
import '../styles/BasicPage.css';

const AdminPage = () => {
    return (
        <div className='page-dimensions'>
            <div>
                <h2 className='title'>
                    Admin
                </h2>
                <Booking />
                <br/>
                <Vehicles/>
                <br/>
                <Locations />
            </div>
            <Footer/>
        </div>
    );
}

export default AdminPage;
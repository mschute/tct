import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const CustomerPage = () => {
    return (
        <div>
            <Header/>
            <div>
                <h2>
                    Customers
                </h2>
                <p> Check out the form!</p>
            </div>
            <Footer/>
        </div>
    );
}

export default CustomerPage;
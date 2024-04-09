import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

const AdminPage = () => {
    return (
        <div>
            <Header/>
            <div>
                <h2>
                    Admin
                </h2>
                <p> Here are your Admin pages!</p>
            </div>
            <Footer/>
        </div>
    );
}

export default AdminPage;
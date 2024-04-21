import React, {useState} from 'react';
import '../styles/tabs.css';
import CustomerSpecific from "./CustomerSpecific";
import BookingSpecific from "./BookingSpecific";
import ItinerarySpecific from "./ItinerarySpecific";

function Itineraries() {
    return null;
}

function Bookings() {
    return null;
}

const CustomerPage = ({jwtToken, activeCustomerId}) => {
    const [activeTab, setActiveTab] = useState('tab1');
    console.log("Jwt Token in Customer page", JSON.stringify(jwtToken));

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    return (
        <div className='page-dimensions'>
            <div>
                <h2 className='title'>
                    Customers
                </h2>
                <div className="tabs">
                    <button className={activeTab === 'tab1' ? 'active' : ''} onClick={() => handleTabClick('tab1')}>
                        Customer Info
                    </button>
                    <button className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabClick('tab2')}>
                        Itineraries
                    </button>
                    <button className={activeTab === 'tab3' ? 'active' : ''} onClick={() => handleTabClick('tab3')}>
                        Bookings
                    </button>
                </div>

                <div className="tab-content">
                    <div id="tab1" className={activeTab === 'tab1' ? 'tab-pane active' : 'tab-pane'}>
                        <CustomerSpecific jwtToken={jwtToken} activeCustomerId={activeCustomerId}/>
                    </div>
                    <div id="tab2" className={activeTab === 'tab2' ? 'tab-pane active' : 'tab-pane'}>
                        <ItinerarySpecific jwtToken={jwtToken} activeCustomerId={activeCustomerId}/>
                    </div>
                    <div id="tab3" className={activeTab === 'tab3' ? 'tab-pane active' : 'tab-pane'}>
                        <BookingSpecific jwtToken={jwtToken} activeCustomerId={activeCustomerId}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerPage;
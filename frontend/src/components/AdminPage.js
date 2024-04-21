import React, {useState} from 'react';
import Booking from "./Booking";
import Vehicles from "./Vehicle";
import Locations from "./Location";
import Roles from "./Roles";
import '../styles/tabs.css';
import Driver from "./Driver";
import Customers from "./Customers";
import Users from "./Users";
import Itinerary from "./Itinerary";

const AdminPage = ({jwtToken}) => {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    return (
        <div className='page-dimensions'>
            <div>
                <h2 className='title'>
                    Admin
                </h2>
                <div className="tabs">
                    <button className={activeTab === 'tab1' ? 'active' : ''} onClick={() => handleTabClick('tab1')}>
                        Booking
                    </button>
                    <button className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabClick('tab2')}>
                        Customers
                    </button>
                    <button className={activeTab === 'tab3' ? 'active' : ''} onClick={() => handleTabClick('tab3')}>
                        Users
                    </button>
                    <button className={activeTab === 'tab4' ? 'active' : ''} onClick={() => handleTabClick('tab4')}>
                        Locations
                    </button>
                    <button className={activeTab === 'tab5' ? 'active' : ''} onClick={() => handleTabClick('tab5')}>
                        Drivers
                    </button>
                    <button className={activeTab === 'tab6' ? 'active' : ''} onClick={() => handleTabClick('tab6')}>
                        Vehicles
                    </button>
                    <button className={activeTab === 'tab7' ? 'active' : ''} onClick={() => handleTabClick('tab7')}>
                        Roles
                    </button>
                </div>

                <div className="tab-content">
                    <div id="tab1" className={activeTab === 'tab1' ? 'tab-pane active' : 'tab-pane'}>
                        <Itinerary jwtToken={jwtToken}/>
                        <br/>
                        <Booking jwtToken={jwtToken}/>
                    </div>
                    <div id="tab2" className={activeTab === 'tab2' ? 'tab-pane active' : 'tab-pane'}>
                        <Customers jwtToken={jwtToken}/>
                    </div>
                    <div id="tab3" className={activeTab === 'tab3' ? 'tab-pane active' : 'tab-pane'}>
                        <Users jwtToken={jwtToken}/>
                    </div>
                    <div id="tab4" className={activeTab === 'tab4' ? 'tab-pane active' : 'tab-pane'}>
                        <Locations jwtToken={jwtToken}/>
                    </div>
                    <div id="tab5" className={activeTab === 'tab5' ? 'tab-pane active' : 'tab-pane'}>
                        <Driver jwtToken={jwtToken}/>
                    </div>
                    <div id="tab6" className={activeTab === 'tab6' ? 'tab-pane active' : 'tab-pane'}>
                        <Vehicles jwtToken={jwtToken}/>
                    </div>
                    <div id="tab7" className={activeTab === 'tab7' ? 'tab-pane active' : 'tab-pane'}>
                        <Roles jwtToken={jwtToken}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
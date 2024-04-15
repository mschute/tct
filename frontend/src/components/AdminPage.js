import React, {useState} from 'react';
import Footer from "./Footer";
import Booking from "./Booking";
import Vehicles from "./Vehicle";
import Locations from "./Location";
import Roles from "./Roles";
import '../styles/tabs.css';
import Driver from "./Driver";

const AdminPage = () => {
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
                        Locations
                    </button>
                    <button className={activeTab === 'tab3' ? 'active' : ''} onClick={() => handleTabClick('tab3')}>
                        Drivers
                    </button>
                    <button className={activeTab === 'tab4' ? 'active' : ''} onClick={() => handleTabClick('tab4')}>
                        Vehicles
                    </button>
                    <button className={activeTab === 'tab5' ? 'active' : ''} onClick={() => handleTabClick('tab5')}>
                        Roles
                    </button>
                </div>

                <div className="tab-content">
                    <div id="tab1" className={activeTab === 'tab1' ? 'tab-pane active' : 'tab-pane'}>
                        <Booking/>
                    </div>
                    <div id="tab2" className={activeTab === 'tab2' ? 'tab-pane active' : 'tab-pane'}>
                        <Locations/>
                    </div>
                    <div id="tab3" className={activeTab === 'tab3' ? 'tab-pane active' : 'tab-pane'}>
                        <Driver/>
                    </div>
                    <div id="tab4" className={activeTab === 'tab4' ? 'tab-pane active' : 'tab-pane'}>
                        <Vehicles/>
                    </div>
                    <div id="tab5" className={activeTab === 'tab5' ? 'tab-pane active' : 'tab-pane'}>
                        <Roles/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default AdminPage;
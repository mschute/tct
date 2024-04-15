import React, {useState} from 'react';
import Footer from "./Footer";
import Customers from "./Customers";
import '../styles/tabs.css';

function Itineraries() {
    return null;
}

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
                        Customer Info
                    </button>
                    <button className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabClick('tab2')}>
                        Itineraries
                    </button>
                </div>

                <div className="tab-content">
                    <div id="tab1" className={activeTab === 'tab1' ? 'tab-pane active' : 'tab-pane'}>
                        <Customers/>
                    </div>
                    <div id="tab2" className={activeTab === 'tab2' ? 'tab-pane active' : 'tab-pane'}>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default AdminPage;
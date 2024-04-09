import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import CustomerPage from './components/CustomerPage';
import AdminPage from './components/AdminPage';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/customerpage" element={<CustomerPage />} />
                    <Route path="/adminpage" element={<AdminPage />} />
                </Routes>
            </div>
        </BrowserRouter>
            
    );
}

export default App;

import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import CustomerPage from './components/CustomerPage';
import AdminPage from './components/AdminPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/customerpage" element={<CustomerPage />} />
                    <Route path="/adminpage" element={<AdminPage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </div>
        </BrowserRouter>
            
    );
}

export default App;

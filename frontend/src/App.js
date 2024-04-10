import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import CustomerPage from './components/CustomerPage';
import AdminPage from './components/AdminPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
    return (
        //TODO BUG WITH NAVIGATION BACK TO HOME
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Home/>} exact/>
                        <Route path="/customerpage" element={<CustomerPage/>} exact/>
                        <Route path="/adminpage" element={<AdminPage/>} exact/>
                        <Route path="/signin" element={<SignIn/>} exact/>
                        <Route path="/signup" element={<SignUp/>} exact/>
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;

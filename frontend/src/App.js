import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import CustomerPage from './components/CustomerPage';
import AdminPage from './components/AdminPage';
import SignInUpModal from "./components/SignInUpModal";

function App() {
    return (
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Home/>} exact/>
                        <Route path="/customerpage" element={<CustomerPage/>} exact/>
                        <Route path="/adminpage" element={<AdminPage/>} exact/>
                        <Route path="/signinupmodal" element={<SignInUpModal/>} exact/>
                        <Route path="/signinupmodal" element={<SignInUpModal/>} exact/>
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;

import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import CustomerPage from './components/CustomerPage';
import AdminPage from './components/AdminPage';
import SignInPage from "./components/SignInPage";
import Header from "./components/Header";
import service from "./service/AccountService";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const handleSignOut = async () => {
        try{
            await service.logout();
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error logging out: ', error.message);
        }
    }
    
    return (
            <BrowserRouter>
                <div>
                    <Header isAuthenticated={isAuthenticated} handleSignOut={handleSignOut} />
                    <Routes>
                        <Route path="/" element={<Home/>} exact/>
                        <Route path="/customerpage" element={<CustomerPage/>} exact/>
                        <Route path="/adminpage" element={<AdminPage/>} exact/>
                        <Route path="/signinpage" element={<SignInPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>} exact/>
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;

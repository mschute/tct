import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import CustomerPage from './components/CustomerPage';
import AdminPage from './components/AdminPage';
import SignInPage from "./components/SignInPage";
import Header from "./components/Header";
import service from "./service/AccountService";
import 'bootstrap/dist/css/bootstrap.min.css';
import {jwtDecode} from "jwt-decode";
import {useNavigate} from 'react-router-dom';


function App() {
    const [jwtToken, setJwtToken] = useState(window.localStorage.getItem('jwtToken'));
    const [userRole, setUserRole] = useState(window.localStorage.getItem('userRole'));
    const [activeCustomerId, setActiveCustomerId] = useState(window.localStorage.getItem('customerId'))
    const navigation = useNavigate();

    const handleSignOut = async () => {
        try {
            await service.logout();

            localStorage.removeItem('jwtToken');
            localStorage.removeItem('expirationTime');
            setJwtToken(null);

            window.localStorage.removeItem('userRole');
            setUserRole(null);
            setActiveCustomerId(null);

            navigation('/');
        } catch (error) {
            console.error('Error logging out: ', error.message);
        }
    }

    const handleSetJwtToken = (token) => {
        console.log("handleSetJwtToken is called")
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        window.localStorage.setItem('jwtToken', token);
        window.localStorage.setItem('expirationTime', expirationTime.toString())
        setJwtToken(token);
        
        console.log("The token to send to the handle sets")
        handleSetUserRole(token)
        handleSetCustomerId(token)
        timeOut(expirationTime);
    }
    
    const timeOut = async (expirationTime) => {
        const currentTime = new Date().getTime();
        const expirationTimeInSeconds = (expirationTime - currentTime);
        setTimeout(() => {handleSignOut();}, expirationTimeInSeconds)
    }

    const handleSetUserRole = (token) => {
        console.log("Handle set user role was called")
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        window.localStorage.setItem('userRole', userRole);
        setUserRole(userRole);
    }

    const handleSetCustomerId = (token) => {
        console.log("Handle set customer Id was called")
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken["customerId"];
        window.localStorage.setItem('customerId', customerId);
        console.log("Customer Id in the handle set", customerId)
        setActiveCustomerId(customerId);
    }

    return (
            <div>
                <Header handleSignOut={handleSignOut} jwtToken={jwtToken} userRole={userRole}/>
                <Routes>
                    <Route path="/" element={<Home activeCustomerId={activeCustomerId}/>} exact/>
                    <Route path="/customerpage" element={<CustomerPage jwtToken={jwtToken} userRole={userRole} activeCustomerId={activeCustomerId}/>} exact/>
                    <Route path="/adminpage" element={<AdminPage jwtToken={jwtToken} userRole={userRole}/>} exact/>
                    <Route path="/signinpage" element={<SignInPage handleSetJwtToken={handleSetJwtToken}/>} exact/>
                </Routes>
            </div>
    );
}

export default App;

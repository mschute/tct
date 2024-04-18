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
    const [userRole, setUserRole] = useState(window.localStorage.getItem('userRole'))
    const navigation = useNavigate();

    const handleSignOut = async () => {
        console.log("Sign out called");
        try {
            await service.logout();

            localStorage.removeItem('jwtToken');
            localStorage.removeItem('expirationTime');
            setJwtToken(null);

            window.localStorage.removeItem('userRole');
            setUserRole(null);

            navigation('/');
        } catch (error) {
            console.error('Error logging out: ', error.message);
        }
    }

    const handleSetJwtToken = (token) => {
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        console.log('token in set token ', expirationTime)
        window.localStorage.setItem('jwtToken', token);
        window.localStorage.setItem('expirationTime', expirationTime.toString())
        setJwtToken(token);
        
        handleSetUserRole(token)
        timeOut(expirationTime);
    }
    
    const timeOut = async (expirationTime) => {
        const currentTime = new Date().getTime();
        const expirationTimeInSeconds = (expirationTime - currentTime);
        setTimeout(() => {handleSignOut();}, expirationTimeInSeconds)
    }

    const handleSetUserRole = (token) => {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        window.localStorage.setItem('userRole', userRole);
        setUserRole(userRole);
    }

    return (
            <div>
                <Header handleSignOut={handleSignOut} jwtToken={jwtToken} userRole={userRole}/>
                <Routes>
                    <Route path="/" element={<Home/>} exact/>
                    <Route path="/customerpage" element={<CustomerPage jwtToken={jwtToken} userRole={userRole}/>} exact/>
                    <Route path="/adminpage" element={<AdminPage jwtToken={jwtToken} userRole={userRole}/>} exact/>
                    <Route path="/signinpage" element={<SignInPage handleSetJwtToken={handleSetJwtToken}/>} exact/>
                </Routes>
            </div>
    );
}

export default App;

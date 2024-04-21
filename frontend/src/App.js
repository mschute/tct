import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
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

    useEffect(() => {
        if (window.localStorage.getItem('jwtToken')) {
            const token = window.localStorage.getItem('jwtToken');
            const decodedToken = jwtDecode(token);
            const expirationTimeSecs = decodedToken.exp;
            const expirationTimeMS = (expirationTimeSecs * 1000);
            const expirationTimeInSeconds = timeOut(expirationTimeMS)

            if (expirationTimeInSeconds > 0) {
                setTimeout(() => {
                    handleSignOut();
                }, expirationTimeInSeconds);
            }
        }
    }, []);

    const handleSignOut = async () => {
        console.log("logging out")
        try {
            await service.logout();

            localStorage.removeItem('jwtToken');
            localStorage.removeItem('expirationTime');
            setJwtToken(null);

            window.localStorage.removeItem('userRole');
            setUserRole(null);

            window.localStorage.removeItem('customerId')
            setActiveCustomerId(null)

            navigation('/');
        } catch (error) {
            console.error('Error logging out: ', error.message);
        }
    }

    const handleSetJwtToken = (token) => {
        const decodedToken = jwtDecode(token);
        const expirationTimeSecs = decodedToken.exp;
        const expirationTimeMS = (expirationTimeSecs * 1000);

        window.localStorage.setItem('jwtToken', token);
        window.localStorage.setItem('expirationTime', expirationTimeMS.toString())
        setJwtToken(token);

        handleSetUserRole(token)
        handleSetCustomerId(token)
        timeOut(expirationTimeMS);
    }

    const timeOut = async (expirationTime) => {
        const currentTime = new Date().getTime();
        const expirationTimeInSeconds = (expirationTime - currentTime);
        setTimeout(() => {
            handleSignOut();
        }, expirationTimeInSeconds)
    }

    const handleSetUserRole = (token) => {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        window.localStorage.setItem('userRole', userRole);
        setUserRole(userRole);
    }

    const handleSetCustomerId = (token) => {
        const decodedToken = jwtDecode(token);
        const customerId = decodedToken["customerId"];
        window.localStorage.setItem('customerId', customerId);
        setActiveCustomerId(customerId);
    }

    return (
        <div>
            <Header handleSignOut={handleSignOut} jwtToken={jwtToken} userRole={userRole}/>
            <Routes>
                <Route path="/" element={<Home jwtToken={jwtToken} activeCustomerId={activeCustomerId}/>} exact/>
                <Route path="/customerpage" element={<CustomerPage jwtToken={jwtToken} userRole={userRole}
                                                                   activeCustomerId={activeCustomerId}/>} exact/>
                <Route path="/adminpage" element={<AdminPage jwtToken={jwtToken} userRole={userRole}/>} exact/>
                <Route path="/signinpage" element={<SignInPage handleSetJwtToken={handleSetJwtToken}/>} exact/>
            </Routes>
        </div>
    );
}

export default App;

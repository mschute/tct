import React, {useState} from "react";
import accountService from '../service/AccountService';
import customerService from "../service/CustomerService";
import "../styles/global.css";
import Header from "./Header";
import "../styles/BasicPage.css";
import {useNavigate} from 'react-router-dom';

const formTypes = {signIn: "Sign In", signUp: "Sign Up"}

const SignInPage = ({isAuthenticated, setIsAuthenticated}) => {
        const [user, setUser] = useState({email: '', password: ''});
        const [formType, setFormType] = useState(formTypes.signIn);
        const navigation= useNavigate();
        const [error, setError] = useState('');

        const handleInputChange = (event) => {
            const {name, value} = event.target
            setUser({...user, [name]: value})
        }
        //TODO Need to add verification if the user signed in successfully or not 
    //TODO Need to add user input validation to make sure they have both a username or password
        const handleSubmit = async (event) => {
            event.preventDefault();
            if (formType === formTypes.signIn) {
                await accountService.login(user);
                setIsAuthenticated(true);
                navigation('/');
            } else {
                //TODO Need to add pop-up asking user to go to their email address to verify their email.
                //TODO Need to assign customer ID to user at registration
                await accountService.register(user);
                navigation('/');
            }
        }

        const handleFormSwitch = () => {
            setFormType(formType === formTypes.signIn ? formTypes.signUp : formTypes.signIn)
        }

        const title = formType === formTypes.signIn ? "Sign In" : "Sign Up";
        const submitButtonText = formType === formTypes.signIn ? "Sign In" : "Sign Up";
        const switchButtonText = formType === formTypes.signUp ? "Or sign In instead" : "Or sign Up instead";

        return (
            <div className="page-dimensions">
                <h4 className="title">{title}</h4>
                <form method="POST">
                    <input className="form-input" name="email" placeholder="Email Address" onChange={handleInputChange}/>
                    <input className="form-input" name="password" type="password" placeholder="Password"
                           onChange={handleInputChange}/>
                    <button className="primary-button" type="submit" onClick={handleSubmit}>{submitButtonText}</button>
                </form>
                <button className="secondary-button" onClick={handleFormSwitch}>{switchButtonText}</button>
            </div>
        );
    }
;

export default SignInPage
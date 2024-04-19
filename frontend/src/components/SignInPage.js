import React, {useState} from "react";
import accountService from '../service/AccountService';
import "../styles/global.css";
import "../styles/BasicPage.css";
import "../styles/Form.css"
import {useNavigate} from 'react-router-dom';


const formTypes = {signIn: "Sign In", signUp: "Sign Up"}

const SignInPage = ({isAuthenticated, setIsAuthenticated, handleSetJwtToken, handleSetUserRole}) => {
    const [user, setUser] = useState({email: '', password: ''});
    const [formType, setFormType] = useState(formTypes.signIn);
    const navigation = useNavigate();
    const [error, setError] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [verificationMessage, setVerificationMessage] = useState('');

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
        setIsButtonDisabled(!(user.email && user.password));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (formType === formTypes.signIn) {
                const response = await accountService.login(user);
                const token = response.token

                handleSetJwtToken(token);

                navigation('/');
            } else {
                //TODO Need to add pop-up asking user to go to their email address to verify their email.
                await accountService.register(user);
                setVerificationMessage( "Registration successful. An email has been sent to verify your email address.");
                setUser({email: '', password: ''});
                navigation('/');
            }
            setError('');
            setVerificationMessage('');
        } catch (error) {
            setError(error.message || "An error occurred during sign-in. Email and password combination not valid.");
        }
    };

    const handleFormSwitch = () => {
        setFormType(formType === formTypes.signIn ? formTypes.signUp : formTypes.signIn)
    }

    const title = formType === formTypes.signIn ? "Sign In" : "Sign Up";
    const submitButtonText = formType === formTypes.signIn ? "Sign In" : "Sign Up";
    const switchButtonText = formType === formTypes.signUp ? "Sign into your account" : "Create an account";

    return (
        <div className="page-dimensions">
            <div className="form-container">
                <h4 className="title">{title}</h4>
                <form method="POST">
                    <div className="sign-in-container">
                        <div className="sign-in-field-container">
                            <input className="sign-in-field" name="email" placeholder="Email Address"
                                   onChange={(e) => {
                                       handleInputChange(e);
                                       setError('');
                                   }}/>
                        </div>
                        <div className="sign-in-field-container">
                            <input className="sign-in-field" name="password" type="password"
                                   placeholder="Password"
                                   onChange={(e) => {
                                       handleInputChange(e);
                                       setError('');
                                   }}/>
                        </div>
                        <div className="button-container">
                            <button className="primary-button" type="submit"
                                    onClick={handleSubmit} disabled={isButtonDisabled}>{submitButtonText}</button>
                        </div>
                    </div>
                </form>
                <div className="sign-in-container">
                    <button className="text-link-button" onClick={handleFormSwitch}>{switchButtonText}</button>
                </div>
                {error === '' ? "" :
                    <div className="error-message">Sign-in failed. Email and password combination invalid.</div>}

                {verificationMessage === true ? "" :
                    <div className="registration-message">{verificationMessage}</div>
                }
            </div>
        </div>
    );
};

export default SignInPage
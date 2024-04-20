import React, {useState} from "react";
import accountService from '../service/AccountService';
import Modal from "./Modal";
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
    const [verificationMessage, setVerificationMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
        navigation('/')
    }
    
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
                await accountService.register(user);
                setVerificationMessage("Registration successful. An email has been sent to verify your email address.");
                setShowModal(true);
                setUser({email: '', password: ''});
            }
            setError('');
            setVerificationMessage('');
        } catch (error) {
            if (formType === formTypes.signIn){
                setError("An error occurred during sign-in. Email and password combination not valid.");
            } else {
                setError("An error occurred during registration. Please try again.");
            }
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
            {showModal ? (<Modal onClose={closeModal} modalTitle="Registration successful" message={verificationMessage}>
                <button onClick={closeModal}>Close</button>
                <span onClick={closeModal}>X</span>
            </Modal>) : null}
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
                                   }}
                            />

                        </div>
                        <div className="button-container">
                            <button className="primary-button" type="submit"
                                    onClick={handleSubmit} disabled={isButtonDisabled}>{submitButtonText}</button>
                        </div>
                    </div>
                </form>
                <div className="sign-in-container">
                    <button className="text-link-button"
                            onClick={handleFormSwitch}>{switchButtonText}</button>
                </div>
                {error === '' ? "" :
                    <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default SignInPage
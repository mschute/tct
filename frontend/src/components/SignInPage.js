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

        const handleInputChange = (event) => {
            const {name, value} = event.target
            setUser({...user, [name]: value})
        }

        //TODO Need to add user input validation to make sure they have both a username or password
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
                    navigation('/');
                }
            } catch (error) {
                setError(error.message || "An error occurred during login.");
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
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="sign-in-field-container">
                                <input className="sign-in-field" name="password" type="password"
                                       placeholder="Password"
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="button-container">
                                <button className="primary-button" type="submit"
                                        onClick={handleSubmit}>{submitButtonText}</button>
                            </div>
                        </div>
                    </form>
                    <div className="sign-in-container">
                        <button className="text-link-button" onClick={handleFormSwitch}>{switchButtonText}</button>
                    </div>
                </div>
            </div>
        );
    }
;

export default SignInPage
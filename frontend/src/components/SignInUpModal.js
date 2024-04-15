import ReactModal from 'react-modal';
import React, {useState} from "react";
import service from '../service/AccountService';
import "../styles/sign-in-sign-up.css";
import "../styles/global.css";

const formTypes = {signIn: "Sign In", signUp: "Sign Up"}

const SignInUpModal = ({isOpen, setIsOpen}) => {
    const [user, setUser] = useState({email: '', password: ''});
    const [formType, setFormType] = useState(formTypes.signIn);
    
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(formType === formTypes.signIn){
            await service.login(user);
        } else {
            await service.register(user);
        }
        await onClose();
    }
    
    const onClose = async () => {
        setIsOpen(false);
    }
    
    const handleFormSwitch = () => {
        setFormType(formType === formTypes.signIn ? formTypes.signUp : formTypes.signIn)
    }
    
    const title = formType === formTypes.signIn ? "Sign In" : "Sign Up";
    const submitButtonText = formType === formTypes.signIn ? "Sign In" : "Sign Up";
    const switchButtonText = formType === formTypes.signUp ? "Or sign In instead" : "Or sign Up instead";
    
    return(
        <ReactModal
        isOpen={isOpen}
        className='modal-container'
        onRequestClose={onClose}
        style={{content: {width: "500px", height: "500px"}}}
        > 
            <h4 className="form=title">{title}</h4>
            <form>
                <input className="form-input" name="email" placeholder="Email Address" onChange={handleInputChange}/>
                <input className="form-input" name="password" type="password" placeholder="Password" onChange={handleInputChange} />
                <button className="primary-button" type="submit" onClick={handleSubmit}>{submitButtonText}</button>
            </form>
           <button className="secondary-button" onClick={handleFormSwitch}>{switchButtonText}</button>
            <button className="delete-button" onClick={onClose}>Close</button>
        </ReactModal>
    );
};

export default SignInUpModal
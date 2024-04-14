import ReactModal from 'react-modal';
import React, {useState} from "react";

const formTypes = {signIn: "Sign In", signUp: "Sign Up"}

const SignInUpModal = ({isOpen}) => {
    const [user, setUser] = useState({email: '', password: ''});
    const [formType, setFormType] = useState(formTypes.signIn);
    
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUser({...user, [name]: value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
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
        style={{content: {width: "500px", height: "500px"}}}
        > 
            <h4>{title}</h4>
            <form>
                <input name="email" placeholder="Email Address" onChange={handleInputChange}/>
                <input name="password" type="password" placeholder="Password" onChange={handleInputChange} />
                <button type="submit" onClick={handleSubmit}>{submitButtonText}</button>
            </form>
           <button onClick={handleFormSwitch}>{switchButtonText}</button>
        </ReactModal>
    );
};

export default SignInUpModal
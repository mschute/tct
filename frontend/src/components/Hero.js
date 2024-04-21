import React from 'react';
import {Container, Image} from "react-bootstrap";
import '../styles/hero.css';
import '../styles/global.css';


const Hero = () => {
    return (
        <Container fluid className='p-0 hero-container'>
            <div className='logo-overlay'>
                <Image src='../images/Logo.png' alt='logo' fluid/>
                <h1 className='business-title'>Tay Country Travel</h1>
            </div>
        </Container>
    );
}

export default Hero;
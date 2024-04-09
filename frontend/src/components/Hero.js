import React from 'react';
import {Container, Image} from "react-bootstrap";

const Hero = () => {
    return (
        <Container fluid>
            <Image
                fluid
                src="/images/PrayingHandsOfMaryGlenLyon.jpg" 
                alt="Hero"
                style={{ maxWidth: '100%', margin: 'auto' }}
            />
        </Container>

    );
}

export default Hero;
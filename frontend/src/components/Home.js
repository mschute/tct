import React from 'react';
import Header from "./Header";
import Hero from "./Hero";
import ContactForm from "./ContactForm";
import Footer from "./Footer";


const Home = () => {
    return (
        <>
            <Header/>
            <main>
                <Hero/>
                <div>
                    <h2>
                        Our Service
                    </h2>
                    <p>
                        WORDS!
                    </p>
                </div>
                <div>
                    <h2>
                        About us
                    </h2>
                    <p>
                        WORDS!
                    </p>
                </div>
                <ContactForm/>
            </main>
            <Footer/>
        </>
    );
}

export default Home;
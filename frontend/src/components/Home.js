import React, {useState} from 'react';
import Header from "./Header";
import Hero from "./Hero";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import MapComponent from "./MapComponent";
import {APIProvider} from "@vis.gl/react-google-maps";
import '../styles/home-section.css';

const Home = () => {
    
    return (
        <>
            <main>
                <Hero/>
                <div className="section-background section-background-odd">
                    <h2 className='section-text section-text-title'>
                        Our Service
                    </h2>
                    <p className='section-text section-text-paragraph'>
                        WORDS!
                    </p>
                </div>
                <div className="section-background section-background-even">
                    <h2 className='section-text section-text-title'>
                        About us
                    </h2>
                    <p className='section-text section-text-paragraph'>
                        Based in the heart of Scotland, our luxury travel company specialises in providing an
                        exceptional transportation experience for golf enthusiasts and tourists alike. With a deep
                        appreciation for Scotland’s rich golfing heritage and breathtaking landscapes, we offer
                        bespoke journeys that seamlessly blend the thrill of world-class golf tours with the charm
                        of cultural exploration.

                        From visits to some of the most iconic golf courses in the world, including St. Andrews and
                        Royal Troon, to access to historic castles, distilleries, and scenic wonders. Our commitment
                        to luxury is evident in every detail. Whether you’re a passionate golfer or an avid
                        traveler, let us transport you to the heart of Scotland for a truly unforgettable adventure.
                    </p>
                </div>
                <div className="section-background section-background-odd">
                    <h2 className='section-text section-text-title'>
                        Fleet
                    </h2>
                    <p className='section-text section-text-paragraph'>
                        WORDS!
                    </p>
                </div>
                <div className="section-background section-background-even">
                    <h2 className='section-text section-text-title'>
                        Locations
                    </h2>
                    <p className='section-text section-text-paragraph'>
                        WORDS!
                    </p>
                </div>
                <div className="section-background section-background-odd">
                    <h2 className='section-text section-text-title'>
                        Itinerary Planner
                    </h2>
                    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
                        <MapComponent />
                    </APIProvider>
                </div>
                <ContactForm className="section-background section-background-even"/>
            </main>
            <Footer/>
        </>
    );
}

export default Home;
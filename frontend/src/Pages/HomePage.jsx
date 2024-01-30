import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./pageStyles.css"
function HomePage() {
    return (

        <div className="centered-container">
            <div className="container">
                <header>
                    <h1>Welcome to OMS Stationery Store</h1>
                </header>

                <h2>About Us</h2>
                <p>
                    Serene Tea Haven invites you to embark on a sensory journey through the world of fine teas. Our store is dedicated to
                    delivering an exceptional tea experience, where every sip tells a story of authenticity and flavor.
                </p>

                <p>
                    At Serene Tea Haven, we understand the art of tea goes beyond just a beverage; it's a moment of tranquility, a pause
                    in the day to savor the richness of nature's finest leaves. Whether you're a seasoned tea enthusiast or a curious
                    newcomer, we offer a thoughtfully curated collection to suit every palate.
                </p>

                <p>
                    Our commitment to quality ensures that each tea leaf is handpicked from esteemed gardens, promising you the
                    finest blends. From the soothing comfort of Earl Grey to the invigorating spices of Chai, our selection is a
                    celebration of diversity and craftsmanship.
                </p>

                <p>
                    Join us at Serene Tea Haven and elevate your tea ritual. Immerse yourself in the world of premium teas, where
                    every cup tells a tale of exquisite taste and aromatic bliss.
                </p>
                <Link to="/store">
                    <button className="store-button">Visit Store</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
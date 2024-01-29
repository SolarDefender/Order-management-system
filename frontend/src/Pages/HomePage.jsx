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
                        OMS Stationery Store is your one-stop destination for all your stationery needs. We pride ourselves in
                        providing high-quality stationery products to our customers. Whether you are a student, professional, or just
                        someone who appreciates the joy of writing, we have a wide range of pens, notebooks, art supplies, and much more
                        to cater to your needs.
                    </p>

                    <p>
                        Our commitment to customer satisfaction, along with our diverse selection of stationery items, makes us a
                        preferred choice for individuals and businesses alike. Explore our store and experience the joy of quality
                        stationery at OMS Stationery Store.
                    </p>
                    <Link to="/store">
                        <button className="store-button">Visit Store</button>
                    </Link>
                </div>
            </div>
    );
}

export default HomePage;
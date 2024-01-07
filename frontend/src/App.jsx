import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import StorePage from './Pages/StorePage';
import NavBar from './NavBar';
import CartPage from './Pages/CartPage';
import SignInPage from './Pages/Authentication/SingInPage';
import SignUpPage from './Pages/Authentication/SignUpPage';
import "./styles.css";

function NotFound (){<h2>404 - Not Found</h2>;}

function App () {
  return (
    <div className="app">
    <NavBar />
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/registr" element={<SignUpPage />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;

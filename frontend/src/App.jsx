import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import StorePage from './StorePage';
import NavBar from './NavBar';
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
      </Routes>
    </Router>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import "./styles.css" 
import logo from "./Logo.png";
function NavBar() {
    return (
      <nav className="nav">
        <div className='site-title'>
        <img
         className="Logo"
         src={logo}
         alt="Error" />
        </div>
        <ul>
          <li>
        <a href={`/`}> Home</a>
        </li>
        <li>
        <a href={`/store`}> Store</a>
        </li>
        </ul>
      </nav>
    );
}

export default NavBar;
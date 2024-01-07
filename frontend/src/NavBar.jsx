import React, { useState, useEffect } from 'react';
import "./styles.css"
import logo from "./Materials/Logo2.png";
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
        {NavBarComponent('/', "Home")}
        {NavBarComponent('/store', "Store")}
        <div className='cart'>
          {NavBarComponent('/cart', "Cart")}
        </div>
        {NavBarComponent('/login',"Sign In")}
      </ul>
    </nav>
  );
}

function NavBarComponent(ref, name) {
  return (
    <li>
      <a href={ref}>{name}</a>
    </li>
  );
}

export default NavBar;
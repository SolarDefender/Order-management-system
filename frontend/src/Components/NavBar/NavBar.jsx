import React from 'react';
import "./styles.css"
import logo from "../../Materials/Logo2.png";
import {NavBarRoutes} from "./NavBarRoutes";
function NavBar() {
  return (
    <nav className="nav">
      <div className='site-title'>
        <img
          className="Logo"
          src={logo}
          alt="Error" />
      </div>
        <NavBarRoutes/>
    </nav>
  );
}

export default NavBar;

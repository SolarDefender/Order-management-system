import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../Materials/Logo2.png";
import { CartCounter } from '../CartCounter/CartCounter';
import "../../styles.css";
import { FaUser  } from 'react-icons/fa';
import { IoLogIn } from "react-icons/io5";
function NavBar() {

  const storedUser = localStorage.getItem('user');
  const isSignedIn = storedUser !== null && parseInt(storedUser, 10) > 0;

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
          <li>
            <Link to={"/cart"}>{"Cart"}</Link >
              <CartCounter />
           </li>
        </div>
        {isSignedIn ? NavBarComponent('/profile',<FaUser />) : NavBarComponent('/login',<div className='icon'><IoLogIn /></div>)}
      </ul>
    </nav>
  );
}

function NavBarComponent(ref, name) {
  return (
    <li>
      <Link to={ref}>{name}</Link>
    </li>
  );
}

export default NavBar;
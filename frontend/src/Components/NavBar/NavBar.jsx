import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../Materials/Logo2.png";
import { CartCounter } from '../CartCounter/CartCounter';
import "../../styles.css";
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
          <li>
            <Link to={"/cart"}>{"Cart"}</Link >
              <CartCounter />
           </li>
        </div>
        {NavBarComponent('/login', "Sign In")}
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
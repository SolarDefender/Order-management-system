import {NavLink} from "react-router-dom";
import "./styles.css";
import React from "react";
import {CartCounter} from "../CartCounter/CartCounter";

export const NavBarRoutes = () => {
  return (
    <ul className="nav-bar-container">
      <li className="nav-bar-item">
        <NavLink to="/" className={({ isActive }) =>
           isActive ? "active" : ""
        }>Home</NavLink>
      </li>
      <li className="nav-bar-item">
        <NavLink to="/store" className={({ isActive }) =>
          isActive ? "active" : ""
        }>Store</NavLink>
      </li>
      <li className="nav-bar-item">
        <NavLink to="/cart" className={({ isActive }) =>
          isActive ? "active" : ""
        }>Cart</NavLink>
        <CartCounter/>
      </li>
      <li className="nav-bar-item">
        <NavLink to="/login" className={({ isActive }) =>
          isActive ? "active" : ""
        }>Sign In</NavLink>
      </li>
    </ul>
  );
}

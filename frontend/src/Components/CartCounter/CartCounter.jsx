// CartCounter.jsx
import React from 'react';
import { useCart } from '../../Contexts/StoreContext';
import './styles.css';

export const CartCounter = () => {
  const cart = useCart();
  const values = Object.values(cart);
  const counter = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div className="cart-container">
      {counter > 0 && (
        <div className={`cart-counter ${counter > 9 ? "more-than-nine" : ""}`}>
          {counter > 9 ? `9+` : counter}
        </div>
      )}
    </div>
  );
};

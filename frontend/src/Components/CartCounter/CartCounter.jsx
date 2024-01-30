import React from 'react';
import { useCart } from '../../Contexts/StoreContext';
import './style.css';

export const CartCounter = () => {
  const cart = useCart();

  const totalQuantity = Object.values(cart).reduce((sum, product) => sum + product.quantity, 0);

  return (
    <div className="cart-container">
      {totalQuantity > 0 && (
        <div className={`cart-counter ${totalQuantity > 9 ? "more-than-nine" : ""}`}>
          {totalQuantity > 9 ? `9+` : totalQuantity}
        </div>
      )}
    </div>
  );
};
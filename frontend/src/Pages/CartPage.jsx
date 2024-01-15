import { useCart, useProducts, useSetCart, useSetProducts } from "../Contexts/StoreContext";
import { useState, useEffect } from "react";
import "./pageStyles.css"
function CartPage() {
  const cart = useCart();
  const setCart = useSetCart();
  const items = useProducts();
  const setItems = useSetProducts();

  const totalPrice = Object.values(cart).reduce(
    (summ, product) => summ + product.Price * product.Quantity,
    0
  );

  function addQuantity(selectedProduct) {
    if (selectedProduct.Amount > 0) {
      selectedProduct.Amount -= 1;
      selectedProduct.Quantity += 1;
      const updatedItems = items.map((item) => {
        if (selectedProduct.id === item.id) {
          return {
            ...item,
            Amount: selectedProduct.Amount,
            Quantity: selectedProduct.Quantity,
          };
        }
        return item;
      });

      const updatedCart = Object.values(cart).map((item) => {
        if (selectedProduct.id === item.id) {
          return {
            ...item,
            Amount: selectedProduct.Amount,
            Quantity: selectedProduct.Quantity,
          };
        }
        return item;
      });

      setItems(updatedItems);
      setCart(updatedCart);
    }
  }

  function reduceQuantity(selectedProduct) {
    if (selectedProduct.Quantity > 0) {
      selectedProduct.Amount += 1;
      selectedProduct.Quantity -= 1;
      const updatedItems = items.map((item) => {
        if (selectedProduct.id === item.id) {
          return {
            ...item,
            Amount: selectedProduct.Amount,
            Quantity: selectedProduct.Quantity,
          };
        }
        return item;
      });

      const updatedCart = Object.values(cart).map((item) => {
        if (selectedProduct.id === item.id) {
          return {
            ...item,
            Amount: selectedProduct.Amount,
            Quantity: selectedProduct.Quantity,
          };
        }
        return item;
      });

      setItems(updatedItems);
      setCart(updatedCart);
    }
  }


  function removeProduct(selectedProduct) {
    const updatedCart = Object.values(cart).filter((item) => item.id !== selectedProduct.id);
    setCart(updatedCart);
  }

  function handleBuy() {
    setCart([]);
  }

  return (
    <div className='grid-container'>
      <div className="products-list">
        <h1>Selected Products</h1>
        
        <ul>
          {Object.values(cart).map((product) => (
            <div className="product-container" key={product.id}>
              <li>
                {product.Name}
                <br />
                <button className="quantity-button" onClick={() => reduceQuantity(product)}>
                  -
                </button>
                <span className="quantity-label">{product.Quantity}</span>
                <button className="quantity-button" onClick={() => addQuantity(product)}>
                  +
                </button>
                {product.Quantity <= 0 && (
                  <button className="quantity-button" onClick={() => removeProduct(product)}>
                    Remove
                  </button>
                )}
                <br />
                <div className='price'><p>${((product.Price.toFixed(2)) * (product.Quantity)).toFixed(2)}</p></div>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="right-section">
          <div className="total-section">
            <p>Total Price: 
              <div className='price'>${totalPrice.toFixed(2)}</div>
            </p>   
            <button className="buy-button" onClick={handleBuy}>
            Buy
          </button>
          </div>
        </div>
    </div>
  );
}

export default CartPage;
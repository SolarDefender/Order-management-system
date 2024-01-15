import { useCart, useProducts, useSetCart, useSetProducts } from "../Contexts/StoreContext";
import { useState,useEffect } from "react";
import "./pageStyles.css"
function CartPage() {
  const cart = useCart();
  const setCart = useSetCart();
  const items=useProducts();
  const setItems = useSetProducts();



  function addQuantity(selectedProduct) {
    if (selectedProduct.Amount > 0) {
      selectedProduct.Amount-=1;
       selectedProduct.Quantity+=1;
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
      selectedProduct.Amount+=1;
      selectedProduct.Quantity-=1;
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
  return (
    <div className='grid-container'>
      <div>
        <h1>Selected Products</h1>
        <ul>
        {Object.values(cart).map((product) => (
            <div className="product-container" key={product.id}>
              <li>
                {product.Name}
                <br/>
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
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CartPage;
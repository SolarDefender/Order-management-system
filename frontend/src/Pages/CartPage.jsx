import { useCart, useProducts, useSetCart, useSetProducts } from "../Contexts/StoreContext";
import { useState, useEffect } from "react";
import "./pageStyles.css"
function CartPage() {
  const cart = useCart();
  const setCart = useSetCart();
  const items = useProducts();
  const setItems = useSetProducts();
  const storedUser = localStorage.getItem('user');
  const isSignedIn = storedUser !== null && parseInt(storedUser, 10) > 0;


   if(!isSignedIn){
    window.location.href = '/login'
   };

  const totalPrice = Object.values(cart).reduce(
    (summ, product) => summ + product.price * product.quantity,
    0
  );

  function addquantity(selectedProduct) {
    if (selectedProduct.amount > 0) {
      selectedProduct.amount -= 1;
      selectedProduct.quantity += 1;
      const updatedItems = items.map((item) => {
        if (selectedProduct.idProduct === item.idProduct) {
          return {
            ...item,
            amount: selectedProduct.amount,
            quantity: selectedProduct.quantity,
          };
        }
        return item;
      });

      const updatedCart = Object.values(cart).map((item) => {
        if (selectedProduct.idProduct === item.idProduct) {
          return {
            ...item,
            amount: selectedProduct.amount,
            quantity: selectedProduct.quantity,
          };
        }
        return item;
      });

      setItems(updatedItems);
      setCart(updatedCart);
    }
  }

  function reducequantity(selectedProduct) {
    if (selectedProduct.quantity > 0) {
      selectedProduct.amount += 1;
      selectedProduct.quantity -= 1;
      const updatedItems = items.map((item) => {
        if (selectedProduct.idProduct === item.idProduct) {
          return {
            ...item,
            amount: selectedProduct.amount,
            quantity: selectedProduct.quantity,
          };
        }
        return item;
      });

      const updatedCart = Object.values(cart).map((item) => {
        if (selectedProduct.idProduct === item.idProduct) {
          return {
            ...item,
            amount: selectedProduct.amount,
            quantity: selectedProduct.quantity,
          };
        }
        return item;
      });

      setItems(updatedItems);
      setCart(updatedCart);
    }
  }


  function removeProduct(selectedProduct) {
    const updatedCart = Object.values(cart).filter((item) => item.idProduct !== selectedProduct.idProduct);
    setCart(updatedCart);
  }

  async function handleBuy() {
    console.log(JSON.stringify({
          Status: "Done",
          UserId: storedUser,
          Products: Object.values(cart).map(product => ({
            IdProduct: product.idProduct,
            Amount: product.quantity
          }))
        }));
    try {
      const response = await fetch('http://localhost:5245/api/Order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: "Done",
          idUser: storedUser,
          products: Object.values(cart).map(product => ({
            idProduct: product.idProduct,
            amount: product.quantity
          }))
        }),
      });

      if (response.ok) {
        // Purchase successful, you can perform any necessary actions
        console.log('Purchase successful');
        setCart([]); // Clear the cart after successful purchase
      } else {
        // Handle errors or show a message to the user
        console.error('Purchase failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during purchase:', error);
    }

    setCart([]);
  }

  return (
    <div className='grid-container'>
      <div className="cart-list">
        <h1>Selected Products</h1>
        
        <ul className="product-list">
          {Object.values(cart).map((product) => (
            <div className="product-container" key={product.idProduct}>
              <li>
                {product.name}
                <br />
                <button className="quantity-button" onClick={() => reducequantity(product)}>
                  -
                </button>
                <span className="quantity-label">{product.quantity}</span>
                <button className="quantity-button" onClick={() => addquantity(product)}>
                  +
                </button>
                {product.quantity <= 0 && (
                  <button className="quantity-button" onClick={() => removeProduct(product)}>
                    Remove
                  </button>
                )}
                <br />
                <div className='price'><p>${((product.price.toFixed(2)) * (product.quantity)).toFixed(2)}</p></div>
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
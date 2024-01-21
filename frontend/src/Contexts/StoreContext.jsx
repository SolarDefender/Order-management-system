import { createContext, useContext, useState, useEffect } from 'react';
import data from "../Materials/data.json"

const CartContext = createContext();
const SetCartContext = createContext();
const ProductsContext=createContext();
const SetProductsContext=createContext();
export function useCart() {
    return useContext(CartContext);
}
export function useSetCart() {
    return useContext(SetCartContext);
}

export function useProducts(){
 return useContext(ProductsContext);
}
export function useSetProducts(){
  return useContext(SetProductsContext);
 }

function StoreContextProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
      });   
      const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
          return JSON.parse(storedItems);
        } else {
          localStorage.setItem('items', JSON.stringify(data));
          return data;
        }
      });
      useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [items, cart]);
    
    return (
        <CartContext.Provider value={cart}>
            <SetCartContext.Provider value={setCart}>
                <ProductsContext.Provider value={items}>
                  <SetProductsContext.Provider value={setItems}>
                {children}
                  </SetProductsContext.Provider>
                </ProductsContext.Provider>
            </SetCartContext.Provider>
        </CartContext.Provider>
    );
}

export default StoreContextProvider;
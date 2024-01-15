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
    const [cart, setCart] = useState([]);   
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(data);
    }, []);
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
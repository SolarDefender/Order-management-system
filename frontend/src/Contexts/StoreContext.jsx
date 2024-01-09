import { createContext, useContext, useState } from 'react';

const CartContext = createContext();
const SetCartContext = createContext();
export function useCart() {
    return useContext(CartContext);
}
export function useSetCart() {
    return useContext(SetCartContext);
}
function StoreContextProvider({ children }) {
    const [cart, setCart] = useState({});
    console.log(cart);
    return (
        <CartContext.Provider value={cart}>
            <SetCartContext.Provider value={setCart}>
                {children}
            </SetCartContext.Provider>
        </CartContext.Provider>
    );
}

export default StoreContextProvider;
  import { createContext, useContext, useState, useEffect } from 'react';
  import axios from 'axios';
  //import data from "../Materials/data.json"

  const CartContext = createContext();
  const SetCartContext = createContext();
  const ProductsContext = createContext();
  const SetProductsContext = createContext();
  export function useCart() {
    return useContext(CartContext);
  }
  export function useSetCart() {
    return useContext(SetCartContext);
  }

  export function useProducts() {
    return useContext(ProductsContext);
  }
  export function useSetProducts() {
    return useContext(SetProductsContext);
  }



  function StoreContextProvider({ children }) {

    const [cart, setCart] = useState(() => {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    });

    const [items, setItems] = useState([]);
    
    useEffect(() => {
      const storedItems = localStorage.getItem('items');
    
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5245/api/Store?page=1&pageSize=30`);
          const result = await response.json();

          //console.log("result:", JSON.stringify(result));

          setItems(result);

          localStorage.setItem('items', JSON.stringify(result));
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
    
      if (storedItems) {
        try {
          const parsedItems = JSON.parse(storedItems);
          if(parsedItems.length>0)
             setItems(parsedItems);
          else
              fetchData();
        } catch (error) {
          console.error("Error parsing stored items:", error);
        }
      } else {
        fetchData();
      }
    }, []);


    

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
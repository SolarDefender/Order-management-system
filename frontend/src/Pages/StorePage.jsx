import React, { useState, useEffect } from 'react';
import data from "../Materials/data.json"
import { useSetCart } from '../Contexts/StoreContext';
import "./pageStyles.css"
function StorePage() {
    const [items, setItems] = useState([]);

    const setCart=useSetCart();
    useEffect(() => {
        setItems(data);
    }, []);
    const cartHandler = (product) => {
        const selectedProduct = items.find(item => item.id === product.id);
        console.log(selectedProduct);
        setCart((prevCart) => {
            if (prevCart[selectedProduct.id]) {
                return { ...prevCart, [selectedProduct.id]:
                      {
                          id: selectedProduct.id,
                          name: selectedProduct.Name,
                          price: selectedProduct.Price,
                          description: selectedProduct.Description,
                          quantity: prevCart[selectedProduct.id].quantity + 1,
                      }};
            } else {
                return { ...prevCart, [selectedProduct.id]: {
                    id: selectedProduct.id,
                    name: selectedProduct.Name,
                    price: selectedProduct.Price,
                    description: selectedProduct.Description,
                    quantity: selectedProduct.Quantity + 1,
                  } };
            }
        });
    };

    return (
        <div className='grid-container'>
            {items.map(item => (
                <div key={item.id}>
                    <div className='product-container'>
                        <p>{item.Name}</p>
                        <p>{item.Description}</p>
                        <div className='price'><p>${item.Price.toFixed(2)}</p></div>
                        <button className='store-button' onClick={() => cartHandler(item)}>Buy</button>
                        <p>Amount: {item.Amount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StorePage;

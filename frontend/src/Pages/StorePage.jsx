import React, { useState, useEffect } from 'react';
import data from "../Materials/data.json"
import { useCart, useSetCart } from '../Contexts/StoreContext';
import "./pageStyles.css"
function StorePage() {
    const [items, setItems] = useState([]);

    const cart = useCart();
    const setCart=useSetCart();
    useEffect(() => {
        setItems(data);
    }, []);

    const addToCart = (productId) => {
        const selectedProduct = items.find(item => item.id === productId);
        setCart((prevCart) => {
            // Check if the selected product is already in the cart
            if (prevCart[selectedProduct.id]) {
                return { ...prevCart, [selectedProduct.id]: prevCart[selectedProduct.id] + 1 };
            } else {
                return { ...prevCart, [selectedProduct.id]: 1 };
            }
        });
    };
    //console.log(items);


    return (
        <div className='grid-container'>
            {items.map(item => (
                <div key={item.id}>
                    <div className='product-container'>
                        <p>{item.Name}</p>
                        <p>{item.Description}</p>
                        <div className='price'><p>${item.Price.toFixed(2)}</p></div>
                        <button className='store-button' onClick={() => addToCart(item.id)}>Buy</button>
                        <p>Amount: {item.Amount}</p>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default StorePage;

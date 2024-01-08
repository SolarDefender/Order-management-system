import React, { useState, useEffect } from 'react';
import data from "../Materials/data.json"

function StorePage() {
    const [items, setItems] = useState([]);
    const [cart,setCart]=useState([]);
    const cartMap=new Map();
    useEffect(() => {
        setItems(data);
        
    }, []);
    
    const addToCart = (productId) => {
        const selectedProduct = items.find(item => item.id === productId);
        if (selectedProduct) {
          setCart(prevCart => [...prevCart, selectedProduct]);
          
        }
        console.log('Cart Contents:', JSON.stringify(cart, null, 2));
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
                        <button className='buy-button'onClick={() => addToCart(item.id)}>Buy</button>
                        <p>Amount: {item.Amount}</p>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default StorePage;

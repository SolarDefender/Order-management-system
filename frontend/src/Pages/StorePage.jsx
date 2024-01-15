import React, { useState, useEffect } from 'react';
import data from "../Materials/data.json"
import { useProducts, useSetCart, useSetProducts } from '../Contexts/StoreContext';
import "./pageStyles.css"
function StorePage() {
    

    const setCart = useSetCart();
    const items= useProducts();
    const setItems=useSetProducts();

    const itemsPerPage = 10; 
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    function cartHandler(selectedProduct){
        if (selectedProduct.Amount > 0) {
            const updatedItems = items.map(item => {
                if (selectedProduct.id === item.id) {
                    //selectedProduct.Amount-=1;
                    return {
                        ...item,
                        Amount: item.Amount - 1,
                    };
                }
                return item;
            });

            setItems(updatedItems);

            setCart((prevCart) => {

                if (prevCart[selectedProduct.id]) {
                    return {
                        ...prevCart, [selectedProduct.id]:
                        {
                            id: selectedProduct.id,
                            Name: selectedProduct.Name,
                            Price: selectedProduct.Price,
                            Description: selectedProduct.Description,
                            Amount: selectedProduct.Amount-1,
                            Quantity: prevCart[selectedProduct.id].Quantity + 1,
                        }
                    };
                } else {

                    return  {
                        ...prevCart, [selectedProduct.id]: {
                            id: selectedProduct.id,
                            Name: selectedProduct.Name,
                            Price: selectedProduct.Price,
                            Description: selectedProduct.Description,
                            Amount: selectedProduct.Amount-1,
                            Quantity: selectedProduct.Quantity + 1,
                        }
                    };
                }


            });
        }

    };

    return (
        <div className='grid-container'>
            {currentItems.map(item => (
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
            <div className="pagination">
                <button className='quantity-button' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                </button>
                <span className='quantity-label'>{currentPage}</span>
                <button className='quantity-button' onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= items.length}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default StorePage;
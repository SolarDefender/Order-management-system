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
    items.forEach(element => {
       console.log(element)});
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    function cartHandler(selectedProduct){
        
        if (selectedProduct.amount > 0) {
            const updatedItems = items.map(item => {
                if (selectedProduct.idProduct === item.idProduct) {
                    //selectedProduct.Amount-=1;
                    return {
                        ...item,
                        amount: item.amount - 1,
                    };
                }
                return item;
            });

            setItems(updatedItems);

            setCart((prevCart) => {

                if (prevCart[selectedProduct.idProduct]) {
                    return {
                        ...prevCart, [selectedProduct.idProduct]:
                        {
                            idProduct: selectedProduct.idProduct,
                            name: selectedProduct.name,
                            price: selectedProduct.price,
                            description: selectedProduct.description,
                            amount: selectedProduct.amount-1,
                            quantity: prevCart[selectedProduct.idProduct].quantity + 1,
                        }
                    };
                } else {

                    return  {
                        ...prevCart, [selectedProduct.idProduct]: {
                            idProduct: selectedProduct.idProduct,
                            name: selectedProduct.name,
                            price: selectedProduct.price,
                            description: selectedProduct.description,
                            amount: selectedProduct.amount-1,
                            quantity: 1,
                        }
                    };
                }


            });
        }

    };

    return (
        <div className='grid-container'>
            {currentItems.map(item => (
                <div key={item.idProduct}>
                    <div className='product-container'>
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <div className='price'><p>${item.price.toFixed(2)}</p></div>
                        <button className='store-button' onClick={() => cartHandler(item)}>Add to cart</button>
                        <p>Amount: {item.amount}</p>
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
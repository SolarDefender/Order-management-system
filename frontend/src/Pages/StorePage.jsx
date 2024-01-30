import React, { useState, useEffect } from 'react';
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

useEffect(() => {
      const storedItems = localStorage.getItem('items');
    
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5245/api/Store?page=1&pageSize=${itemsPerPage}`);
          const result = await response.json();
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

    async function handleNextPage(){
        
        if(indexOfLastItem <= items.length)
          {

            try {
                const response = await fetch(`http://localhost:5245/api/Store?page=${currentPage+1}&pageSize=${itemsPerPage}`);
            
                if(response.ok){
                    setCurrentPage(currentPage + 1);
                const result = await response.json();
                    setItems((prevItems) => [...prevItems, ...result]);
                }
                
              } catch (error) {
                console.log("Error fetching data:", error);
              }
          }
    }

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
                <button className='quantity-button' onClick={handleNextPage} >
                    Next
                </button>
            </div>
        </div>
    );
}

export default StorePage;
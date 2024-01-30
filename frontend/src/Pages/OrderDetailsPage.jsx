import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function OrderDetailsPage(){

    const [items, setItems] = useState([]);
    const {id}=useParams();
    useEffect(() => {
            const fetchData = async () => {
                try {
                    console.log(id);
                    const response = await fetch(`http://localhost:5245/api/Order/${id}`);
                    const result = await response.json();
                    console.log(result);
                    setItems(result.products);
                    
                } catch (error) {
                    console.log("Error fetching data:", error);
                }
            };
            fetchData();
    }, [id]);
    return (
        <div className='grid-container'>
            {items.map(item => (
                <div key={item.idProduct}>
                    <div className='product-container'>
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <div className='price'><p>${item.price.toFixed(2)}</p></div>
                        <p>Amount: {item.amount}</p>
                    </div>
                </div>
            ))}
            
        </div>
    );
}

export default OrderDetailsPage;
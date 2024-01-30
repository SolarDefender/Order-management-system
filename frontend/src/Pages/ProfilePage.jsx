import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
function ProfilePage() {
    const [items, setItems] = useState([]);
    

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const isSignedIn = storedUser !== null && parseInt(storedUser.idUser, 10) > 0;

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    items.forEach(element => {
        console.log(element)
    });


    if (!isSignedIn) {
        window.location.href = '/login'
    };
    useEffect(() => {
        try {

            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:5245/api/Order/byUser/${storedUser.idUser}`);
                    const result = await response.json();
                    setItems(result);
                } catch (error) {
                    console.log("Error fetching data:", error);
                }
            };
            fetchData();
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = '/login';
    };

    return (
        <div className="total-info">
            <div className="user-info-container">
                <h1>User info:</h1>
                <p>First name: {storedUser.firstName}</p>
                <p>Last name: {storedUser.lastName}</p>
                <p>email: {storedUser.email}</p>
                <p>Phone number: {storedUser.phoneNum}</p>
                <p>Role: {storedUser.role}</p>
                <button type="button" className='store-button' onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <h1>Orders:</h1>
            <div className='grid-container'>
                {currentItems.map(item => (
                    <div key={item.idOrder}>
                        <div className='product-container'>
                            <p>Id: {item.idOrder}</p>
                            <p>Created at: {item.createdAt}</p>
                            <p>Status: {item.status}</p>
                            <Link to={`/order/${item.idOrder}`}>
                            <button className='store-button'>Details</button>
                            </Link>
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
        </div>
    );

}

export default ProfilePage;
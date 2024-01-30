import React from 'react';
import { BrowserRouter as Router, Route, Routes,useLocation  } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import StorePage from './Pages/StorePage';
import NavBar from './Components/NavBar/NavBar';
import CartPage from './Pages/CartPage';
import SignInPage from './Pages/Authentication/SingInPage';
import SignUpPage from './Pages/Authentication/SignUpPage';
import StoreContextProvider from './Contexts/StoreContext';
import Footer from './Components/Footer/Footer';
import "./styles.css";
import ProfilePage from './Pages/ProfilePage';
import OrderDetailsPage from './Pages/OrderDetailsPage';


function NotFound() { 
  const location = useLocation();
  const errorMessage = new URLSearchParams(location.search).get('error');

return (
  <div>
    <h2>404 - Not Found</h2>
    {errorMessage && <p>Error: {errorMessage}</p>}
  </div>
); 
}

function App() {
  return (
    <body >
      <StoreContextProvider>
        <Router>
        <NavBar />
          <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/notFound" element={<NotFound />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
          </Routes>
          </div>
          <Footer />
        </Router>
      </StoreContextProvider>
    </body>
  );
};

export default App;

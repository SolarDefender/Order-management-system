import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import StorePage from './Pages/StorePage';
import NavBar from './Components/NavBar/NavBar';
import CartPage from './Pages/CartPage';
import SignInPage from './Pages/Authentication/SingInPage';
import SignUpPage from './Pages/Authentication/SignUpPage';
import StoreContextProvider from './Contexts/StoreContext';
import Footer from './Components/Footer/Footer';
import "./styles.css";


function NotFound() { <h2>404 - Not Found</h2>; }

function App() {
  return (
    <div className="app">
      <StoreContextProvider>
        <Router>
        <NavBar />
        <body>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/registr" element={<SignUpPage />} />
          </Routes>
          </body>
          <Footer />
        </Router>
      </StoreContextProvider>
    </div>
  );
};

export default App;

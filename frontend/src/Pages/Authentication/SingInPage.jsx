import React, { useState } from 'react';
import { FaUser,FaLock  } from "react-icons/fa";
import { Link } from 'react-router-dom';
function SignInPage(){

    const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:5245/api/User/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword
      }),
    })
      .then(async res => {if (res.ok) {
        const result = await res.json();
        console.log('Login successful');
        window.location.href = '/';
        localStorage.setItem('user', result);
        return result;
      } else if (res.status === 404) {
        // return res.text().then((errorMessage) => {
        //   console.error('Login failed with status 404:', errorMessage);
        //   window.location.href = `/notFound?error=${encodeURIComponent(
        //     errorMessage
        //   )}`;
        // });
      } else {
        console.error('Login failed with status:', res.status);
      }})
      .then(data => {
        console.log('Login successful. Data:', data);
      });
    console.log('Logging in with:', { userEmail, userPassword });
  };

  return (
    <div className="login-container">
       <form className='login-form'>
      <h2>Login</h2>
        <div className='input-box'>
          Username:
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <FaUser className='icon'/>
        <br />
        </div>
        <div className='input-box'>
          Password:
          <input
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
           <FaLock className='icon'/>
        </div>
        <br />
        <button type="button" className='store-button' onClick={handleLogin}>
          Login
        </button>
        <Link to={"/register"}>{" Sign Up"}</Link >
      </form>
    </div>
  );

}
export default SignInPage;
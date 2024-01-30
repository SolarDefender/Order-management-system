import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUpPage() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phoneNum: '',
        email: '',
        password: ''
    });

    const { firstName, lastName, phoneNum, email, password } = user;

    const setUserField = (field, value) => {
        setUser(prevUser => ({
            ...prevUser,
            [field]: value
        }));
    };


    const handleSignUp = () => {
        fetch('http://localhost:5245/api/User', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                phoneNum,
                email,
                password
            }),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Sign up successful');
                    window.location.href = '/login';
                } else {
                    console.error('Sign up failed with status:', response.status);
                }
            })
            .catch(error => {
                console.error('Error during sign up:', error);
            });
    };

    return (
        <div className="login-container">
            <form className='login-form'>
                <h2>Sign Up</h2>
                <div className='input-box'>
                    <label htmlFor="firstName">First Name: </label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setUserField('firstName', e.target.value)}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setUserField('lastName', e.target.value)}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor="phoneNum">Phone number: </label>
                    <input
                        type="tel"
                        id="phoneNum"
                        value={phoneNum}
                        onChange={(e) => setUserField('phoneNum', parseInt(e.target.value, 10))}
                    />
                </div>
                <div className='input-box'>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setUserField('email', e.target.value)}
                    />
                    <br />
                </div>
                <div className='input-box'>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setUserField('password', e.target.value)}
                    />
                </div>
                <br />
                <button type="button" className='store-button' onClick={handleSignUp}>
                    Sign up
                </button>
                <Link to={"/login"}>{" Sign in"}</Link >
            </form>
        </div>
    );

}
export default SignUpPage;
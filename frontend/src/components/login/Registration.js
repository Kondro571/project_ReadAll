import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logoImage from "./../../images/header/logo.png";
import User from '../../models/userRegisterModel';

function RegistrationForm({ messages }) {
  const [user, setUser] = useState(new User('', ''));

  const [registrationError, setRegistrationError] = useState(null);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setRegistrationError(errorData.message);
        return;
      }

      

    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <>
      <div className="logo-login">
        <a href="/"> <img src={logoImage} alt="Logo" height="70" /></a>
      </div>

      <div className="login-container">
        <h1>Registration</h1>

        <form onSubmit={handleSubmit}>
          <div className="messages">
            {registrationError && <span>{registrationError}</span>}
          </div>
          <input type="email" placeholder="Email" name="email" value={user.email} onChange={handleChange} required />
          <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} required />
          <input type="password" placeholder="Repeat password" name="repeatPassword" onChange={handleChange} required /> {/* Dodanie pola repeatPassword */}
          <button type="submit" className="confirm-button">Create account</button>

          <div className="login-return">
            Do you have an account?
            <a href="login"> log in </a>
          </div>

        </form>
      </div>
    </>
  );
}

export default RegistrationForm;

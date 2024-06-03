import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import logoImage from "./../../images/header/logo.png";
import User from '../../models/userRegisterModel';

function RegistrationForm({ messages }) {
  const [user, setUser] = useState(new User('', ''));
  const [repeatPassword, setRepeatPassword] = useState(''); // Dodanie stanu dla repeatPassword
  const [registrationError, setRegistrationError] = useState(null);
  const [passwordError, setPasswordError] = useState(null); // Stan do przechowywania błędów haseł

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'repeatPassword') {
      setRepeatPassword(value);
    } else {
      setUser(prevUser => ({
        ...prevUser,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistrationError(null);
    setPasswordError(null);

    // Sprawdzanie, czy hasła są takie same
    if (user.password !== repeatPassword) {
      setPasswordError('Passwords are different.');
      return;
    }

    // Sprawdzanie długości hasła
    if (user.password.length < 8) {
      setPasswordError('Minimum password length must be 8 characters');
      return;
    }

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

      window.location.href="http://localhost:3000/login";

    } catch (error) {
      console.error('Error registering:', error);
      setRegistrationError('Error. Try layter');
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
            {passwordError && <span>{passwordError}</span>} {/* Wyświetlanie komunikatów o błędach haseł */}
          </div>
          <input type="email" placeholder="Email" name="email" value={user.email} onChange={handleChange} required />
          <input type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} required />
          <input type="password" placeholder="Repeat password" name="repeatPassword" value={repeatPassword} onChange={handleChange} required /> {/* Dodanie pola repeatPassword */}
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

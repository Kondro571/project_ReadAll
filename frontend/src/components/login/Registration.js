import React from 'react';
import logoImage from "./../../images/header/logo.png"

import "./css/login-registration.css"
function RegistrationForm({ messages }) {
  return (
    <>
        <div className="logo-login">
            <a href="/"> <img src={logoImage} alt="Logo" height="70" /></a>
        </div>

        <div className="login-container">
            <h1>Registration</h1>

            <form action="register" method="POST">
                <div className="messages">
                {messages && messages.map((message, index) => (
                    <span key={index}>{message}</span>
                ))}
                </div>
                <input type="email" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <input type="password" placeholder="Repead password" name="repeat_password" required />
                <button type="submit" className="confirm-button">Create account</button>

                <a class="login-return">
                    Do you have account  
                    <a href="login"> log in </a>
                </a>

            </form>
        </div>
    </>
  );
}

export default RegistrationForm;

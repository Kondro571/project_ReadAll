import React from 'react';
import logoImage from "./../../images/header/logo.png"

import "./css/login-registration.css"
function LoginForm({ messages }) {
  return (
    <>
        <div className="logo-login">
            <a href="/"> <img src={logoImage} alt="Logo" height="70" /></a>
        </div>

        <div className="login-container">
            <h1>Login</h1>

            <form action="login" method="POST">
                <div className="messages">
                {messages && messages.map((message, index) => (
                    <span key={index}>{message}</span>
                ))}
                </div>
                <input type="email" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <button type="submit" className="confirm-button">login</button>

                <a href="login">Forget password?</a>

                <a href="registration" className="create-account-button">
                    Create new account
                </a>

            </form>
        </div>
    </>
  );
}

export default LoginForm;

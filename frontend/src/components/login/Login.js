import React, { useState } from 'react';
import logoImage from "./../../images/header/logo.png"
import { setAuthHeader } from "../../services/BackendService";

import "./css/login-registration.css"
function LoginForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({email: login, password: password})
        }).then(response => {
            if (response.status == 200) {
                return response.json();

            } else {
                return null;
            }
        }).then(data => {
            if (data !== null) {
                console.log(data["token"]);
                setAuthHeader(data["token"]);
                window.location.href="http://localhost:3000"
                
            } else {
                console.log("Nie udało się zalogować");
                setAuthHeader(null);
            }
        });
    }

    return (
        <>
            <div className="logo-login">
                <a href="/"> <img src={logoImage} alt="Logo" height="70" /></a>
            </div>

            <div className="login-container">
                <h1>Login</h1>

                <form onSubmit={onSubmit}>
                    <div className="messages">
                        {/* Tutaj wyświetl komunikaty */}
                    </div>
                    <input type="email" placeholder="Email" value={login} onChange={(e) => setLogin(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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

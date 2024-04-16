import React from 'react';
import logoImage from "./../../images/header/logo.png"
import './css/logo.css'

function Logo() {
    return (
        <div className="logo">
            <a href="/"> <img src={logoImage} alt="Logo" height="70" /></a>
        </div>
    );
}

export default Logo;

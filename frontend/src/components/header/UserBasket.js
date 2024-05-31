import React, { useState, useEffect } from 'react';

import basketImage from "./../../images/header/basket.png";
import accountImage from "./../../images/header/account.png";

import { getAuthToken, setAuthHeader } from "../../services/BackendService";
import { jwtDecode } from 'jwt-decode';

import "./css/userBasket.css";

function UserMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let token = getAuthToken();
        console.log(token);

        if (token !== null) {
            setIsAuthenticated(true); 

            const decoded = jwtDecode(token);
            console.log(decoded.role);
            if (decoded.role === "ADMIN") {
                setIsAdmin(true); 
            } else {
                setIsAdmin(false); 
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    }

    const handleLogout = () => {
        setAuthHeader(null); // Usunięcie tokena lub wylogowanie użytkownika
        window.location.href = "/login"; // Przekierowanie do strony logowania
    }

    return (
        <div className="top-bar">
            <div className="basket">
                <a href="/basket">
                    <img src={basketImage} alt="basket" height="50" />
                </a>
            </div>
            <div className="user-menu" onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
                <a href="/profile">
                    <img src={accountImage} alt="account" height="50" />
                </a>
                {isMenuOpen && (
                    <div className="menu-items">
                        {isAdmin && <a href="#" className="menu-btn btn1">Admin Staff</a>}
                        {isAuthenticated && <a href="#" className="menu-btn btn2" onClick={handleLogout}>Log out</a>}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserMenu;

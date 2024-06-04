import React, { useState, useEffect } from 'react';
import './css/header.css';

import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserBasket';

import { getAuthToken, setAuthHeader } from "../../services/BackendService";
import {jwtDecode } from 'jwt-decode';  // Note the import without destructuring

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = getAuthToken();

        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            console.log(currentTime);
            console.log(decodedToken.exp);
            if (decodedToken.exp < currentTime) {

                handleLogout();
            } else {
                setIsAuthenticated(true);
                if (decodedToken.role === "ADMIN") {
                    setIsAdmin(true);
                }
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        setAuthHeader(null); 
        setIsAuthenticated(false);
        setIsAdmin(false);
        window.location.href = '/login'; 
    };

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <header>
            <Logo />
            <Navigation />
            <SearchBar />
            {isAuthenticated ? <UserMenu /> : <a className="login-link" href="/login">log in</a>}
        </header>
    );
}

export default Header;








// import React from 'react';
// import './css/header.css'

// import Logo from './Logo';
// import Navigation from './Navigation';
// import SearchBar from './SearchBar';
// import UserMenu from './UserBasket';


// class Header extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isMenuOpen: false
//         };
//         this.toggleMenu = this.toggleMenu.bind(this);
//     }

//     toggleMenu() {
//         this.setState(prevState => ({
//             isMenuOpen: !prevState.isMenuOpen
//         }));
//     }

//     render() {
//         return (
//             <header>
//                 <Logo />
//                 <Navigation />
//                 <SearchBar />
//                 <UserMenu />


//             </header>
//         );
//     }
// }

// export default Header;

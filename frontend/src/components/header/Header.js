import React, { useState, useEffect } from 'react';
import './css/header.css'

import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserBasket';

import { CustomJwtPayload } from "../../models/CustomJwtPayload";
import { getAuthToken } from "../../services/BackendService";
import { jwtDecode } from 'jwt-decode';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let token = getAuthToken();
        console.log(token);


        if (token !== null) {
            setIsAuthenticated(false); 

        } else {
            setIsAuthenticated(true);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    }

    return (
        <header>
            <Logo />
            <Navigation />
            <SearchBar />
            {isAuthenticated && <a href="login">log in</a>}
            {!isAuthenticated && <UserMenu />}
          
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

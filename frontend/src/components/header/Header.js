import React from 'react';
import './css/header.css'

import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserBasket';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    }

    render() {
        return (
            <header>
                <Logo />
                <Navigation />
                <SearchBar />
                <UserMenu />


            </header>
        );
    }
}

export default Header;

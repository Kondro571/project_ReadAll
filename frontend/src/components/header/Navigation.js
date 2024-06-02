import React from 'react';

import "./css/navigation.css"
class Navigation extends React.Component {
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
            <nav className="category">
                <div className="mobile-icon" onClick={this.toggleMenu}>&#9776;</div>
                <ol className={`menu-list ${this.state.isMenuOpen ? 'open' : ''}`}>
                    <li className="main-page-link"><a href="#">Main page</a></li>
                    <li>
                        <a href="/books">Books</a>
                    </li>
                    <li>
                        <a href="/comics">Comics</a>
                    </li>
                    <li>
                        <a href="/manga">Manga</a>
                    </li>
                </ol>
            </nav>
        );
    }
}

export default Navigation;

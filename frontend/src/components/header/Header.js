import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserBasket';

import { getAuthToken, setAuthHeader } from "../../services/BackendService";
import { jwtDecode } from 'jwt-decode'; // Note the import without destructuring

// Tworzymy style za pomocą react-jss
const useStyles = createUseStyles({
  header: {
    backgroundColor: 'rgb(0, 0, 0)',
    color: '#fff',
    padding: 10,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    zIndex: 99999,
    width: '100%',
    height: 100,
  },
  loginLink: {
    color: 'white',
    marginRight: 30,
    fontSize: 20,
    textDecoration: 'none',
  },
});

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        const fetchedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          image: product.image,
          description: product.description,
          price: product.price,
          author: product.author,
          type: product.type,
          categories: product.categories,
        }));
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const classes = useStyles();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
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
    <header className={classes.header}>
      <Logo />
      <Navigation />
      <SearchBar products={products} /> {/* Przekazujemy listę produktów */}
      {isAuthenticated ? <UserMenu /> : <a className={classes.loginLink} href="/login">log in</a>}
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

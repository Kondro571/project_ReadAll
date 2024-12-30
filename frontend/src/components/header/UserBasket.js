import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import basketImage from "./../../images/header/basket.png";
import accountImage from "./../../images/header/account.png";

import { getAuthToken, setAuthHeader } from "../../services/BackendService";
import { jwtDecode } from 'jwt-decode';

const useStyles = createUseStyles({
  topBar: {
    paddingRight: 70,
    display: 'flex',
  },
  basket: {
    // marginLeft: 20,
    flex: 1,
  },
  userMenu: {
    position: 'relative',
    display: 'inline-block',
    marginLeft: 20,
    flex: 1,
    
  },
  menuItems: {
    display: 'none',
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    width: 120,
    fontSize: 10,
  },
  menuBtn: {
    display: 'block',
    padding: 10,
    textDecoration: 'none',
    color: 'black',
    
    "&:hover": {
      backgroundColor: '#f1f1f1',
    },
  },
  // Show menu on hover
  userMenuShow: {
    display: 'block',
  },
});

function UserMenu() {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let token = getAuthToken();

    if (token !== null) {
      setIsAuthenticated(true);

      const decoded = jwtDecode(token);

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
    setAuthHeader(null); 
    window.location.href = "/login"; 
  }

  return (
    <div className={classes.topBar}>
      <div className={classes.basket}>
        <a href="/basket">
          <img src={basketImage} alt="basket" height="50" />
        </a>
      </div>
      <div 
        className={classes.userMenu} 
        onMouseEnter={toggleMenu} 
        onMouseLeave={toggleMenu}
      >
        <a href="/profile">
          <img src={accountImage} alt="account" height="50" />
        </a>
        <div 
          className={`${classes.menuItems} ${isMenuOpen ? classes.userMenuShow : ''}`}
        >
          {isAdmin && <a href="/admin" className={classes.menuBtn}>Add product</a>}
          {isAuthenticated && <a href="#" className={classes.menuBtn} onClick={handleLogout}>Log out</a>}
        </div>
      </div>
    </div>
  );
}

export default UserMenu;

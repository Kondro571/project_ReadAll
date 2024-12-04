import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  category: {
    display: 'flex',
    marginRight: 'auto',
    paddingLeft: 20,
  },
  mobileIcon: {
    display: 'none',
    cursor: 'pointer',
    fontSize: 24,
    marginRight: 10,
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    backgroundColor: 'rgb(56, 57, 63)',
    fontSize: 18,
    lineHeight: '56px',
    textAlign: 'center',
  },
  menuItem: {
    float: 'left',
    width: 120,
    paddingLeft: 10,
    backgroundColor: 'rgb(56, 57, 63)',
    '&:hover': {
      backgroundColor: '#602d00',
    },
    '&:hover a': {
      color: '#EEE',
    },
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: '#ffffff',
    padding: '0 5px',
    fontSize: 23,
  },
  mainPageLink: {
    display: 'none', // Ukrycie Main Page w desktopie
  },
  menuListClosed: {
    display: 'none', // Ukrycie menu w widoku mobilnym domyślnie
  },
  menuListOpen: {
    paddingLeft:0,
    display: 'flex',
    flexDirection: 'column', // Układ pionowy w widoku mobilnym
    position: 'absolute',
    top: '75px',
    left: 0,
    width: '100%',
    backgroundColor: 'rgb(56, 57, 63)',
    zIndex: 1000,
    listStyle:"none",



  },
  '@media (max-width: 705px)': {
    mobileIcon: {
      display: 'block', // Pokaż ikonę hamburgera w widoku mobilnym
      
    },
    menuList: {
      display: 'none', // Ukryj menu w widoku mobilnym domyślnie
    },
    menuListOpen: {
      display: 'flex', // Wyświetl menu w widoku mobilnym po kliknięciu
    },
    mainPageLink: {
      display: 'block', // Pokaż Main Page w widoku mobilnym
    },
    menuItem: {
      width: '100%', // Link zajmuje całą szerokość
      paddingBottom: 15, // Dodanie odstępu między linkami
      paddingTop: 15, //
      paddingLeft:20,
    },
  },
});

const Navigation = () => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className={classes.category}>
      <div className={classes.mobileIcon} onClick={toggleMenu}>
        &#9776; {/* Ikona hamburgera */}
      </div>
      <ol className={`${isMenuOpen ? classes.menuListOpen : classes.menuList}`}>
        <li className={`${classes.menuItem} ${classes.mainPageLink}`}>
          <a href="/" className={classes.link}>Main page</a>
        </li>
        <li className={classes.menuItem}>
          <a href="/books" className={classes.link}>Books</a>
        </li>
        <li className={classes.menuItem}>
          <a href="/comics" className={classes.link}>Comics</a>
        </li>
        <li className={classes.menuItem}>
          <a href="/manga" className={classes.link}>Manga</a>
        </li>
      </ol>
    </nav>
  );
};

export default Navigation;

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
    display: 'none',
  },
  '@media only screen and (max-width: 705px)': {
    mainPageLink: {
      display: 'block',
    },
    menuList: {
      position: 'fixed',
      marginTop: 30,
    },
    mobileIcon: {
      display: 'block',
    },
    menuItem: {
      width: '100%',
      marginLeft: 0,
      marginBottom: 5,
      '&:hover': {
        backgroundColor: '#333',
      },
    },
    menuListClosed: {
      display: 'none',
      flexDirection: 'column',
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
        &#9776;
      </div>
      <ol className={`${classes.menuList} ${isMenuOpen ? classes.menuListClosed : ''}`}>
        <li className={classes.mainPageLink}>
          <a href="#">Main page</a>
        </li>
        <li className={classes.menuItem}>
          <a href="/books" className={classes.link}>
            Books
          </a>
        </li>
        <li className={classes.menuItem}>
          <a href="/comics" className={classes.link}>
            Comics
          </a>
        </li>
        <li className={classes.menuItem}>
          <a href="/manga" className={classes.link}>
            Manga
          </a>
        </li>
      </ol>
    </nav>
  );
};

export default Navigation;

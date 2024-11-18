import React from 'react';
import { createUseStyles } from 'react-jss';
import obr from './img/search.png';
// import searchImage from "./../../images/header/search.png" // Odkomentuj, gdy chcesz używać obrazu

const useStyles = createUseStyles({
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    width: 180,
    paddingRight: 40,
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#ffffff',
    // backgroundImage: 'url('+obr+')', // Jeśli chcesz dodać obrazek, użyj odpowiedniej ścieżki
    backgroundImage: `url(${obr})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '5px center',
    backgroundSize: '22px 22px',
    border: 'none',
    borderRadius: 15,
    borderBottom: '3px solid #ffffff',
    padding: '7px 40px 7px 45px', // Dostosuj padding, aby tekst nie nakrywał obrazka
  },
});

function SearchBar() {
  const classes = useStyles();

  return (
    <div className={classes.searchBar}>
      {/* <img src={searchImage} alt="Search" /> */} 
      <input type="text" className={classes.searchInput} placeholder="search" />
    </div>
  );
}

export default SearchBar;

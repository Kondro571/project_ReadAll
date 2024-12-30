import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom'; // Używamy do nawigacji
import obr from './img/search.png';

const useStyles = createUseStyles({
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    width: 180,
    paddingRight: 40,

    position: 'relative',

  },
  searchInput: {
    width: '100%',
    backgroundColor: '#ffffff',
    backgroundImage: `url(${obr})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '10px center',
    backgroundSize: '22px 22px',
    border: 'none',
    borderRadius: 15,
    padding: '10px 40px',
  },
  suggestionsList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '0 0 8px 8px',
    zIndex: 1000,
    maxHeight: '200px',
    overflowY: 'auto',
  },
  suggestionItem: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f9f9f9',
    },
  },
});

function SearchBar({ products }) {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filtrujemy produkty
    if (query) {
      const filteredSuggestions = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <div className={classes.searchBar}>
      <input
        type="text"
        className={classes.searchInput}
        placeholder="Search for products"
        value={searchQuery}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className={classes.suggestionsList}>
          {suggestions.map(product => (
            <li
              key={product.id}
              className={classes.suggestionItem}
              onClick={clearSearch}
            >
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;

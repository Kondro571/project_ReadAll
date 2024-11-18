import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  filter: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 40,
    flex: 1,
  },
  buttonContainer: {

    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: 'rgb(181, 169, 7)',
    color: 'aliceblue',
    border: 'none',
    width: 190,
    height: 35,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginBottom: 10,
    '&:hover': {
      backgroundColor: 'rgb(161, 149, 7)',
    },
  },
  filterOptions: {
    display: 'flex',
    flexDirection: 'column',
    '&label': {
        marginBottom: 50,
        display: 'flex',
        alignItems: 'center',
        width: 120,
    }
  },

  typeFilter:{
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
  },
  accordion: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
    
  },
  accordionHeader: {
    cursor: 'pointer',
    fontSize: 16,
    margin: 0,
    padding: 10,
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  accordionContent: {
    display: 'none',
    '&.show': {
      display: 'block',
    },
  },
  categoryCheckboxes: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  typeCheckboxes: {
    display: 'flex',
    textAlign: 'center',
  },
  checkboxLabel: {
    
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
    width: 120,
    '&:hover': {
      backgroundColor: 'rgb(79, 79, 79)',
      color: 'white',
    },
    
  },
  priceFilter: {
    padding: 15,
    border: '1px solid #ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  priceFilterH4: {
    marginTop: 0,
    fontSize: 18,
    color: '#333',
  },
  priceLabel: {
    paddingLeft: 50,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    '& input': {
      width: 100,
      padding: 5,
      marginLeft: 10,
      border: '1px solid #ccc',
      borderRadius: 5,
      outline: 'none',
      transition: 'border-color 0.3s',
      '&:focus': {
        borderColor: '#007bff',
      },
    },
  },
  checkbox: {
    appearance: 'none',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    width: 16,
    height: 16,
    border: '1px solid #ccc',
    borderRadius: 3,
    marginRight: 5,
    '&:checked::before': {
      content: '"✔"',
      display: 'inline-block',
      width: 16,
      height: 16,
      textAlign: 'center',
      lineHeight: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: 3,
    },
  },
});

function Filter({ categories, types, onFilterChange }) {
  const classes = useStyles();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleFilterChange = () => {
    onFilterChange({
      categories: selectedCategories,
      types: selectedTypes,
      minPrice: minPrice !== '' ? parseFloat(minPrice) : null,
      maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : null,
    });
  };

  const toggleCategories = () => {
    const content = document.querySelector(`.${classes.accordionContent}`);
    content.classList.toggle('show');
  };

  return (
    <div className={classes.filter}>
      <h3>Filter Products</h3>
      <div className={classes.buttonContainer}>
        <button className={classes.filterButton} onClick={handleFilterChange}>
          Apply Filters
        </button>
      </div>
      <div className={classes.filterOptions}>
        <div className={classes.priceFilter}>
          <h4 className={classes.priceFilterH4}>Price</h4>
          <label className={classes.priceLabel}>
            Min price:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label className={classes.priceLabel}>
            Max price:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </div>
        <div className={classes.typeFilter}>
          <h4>Types</h4>
          <div className={classes.typeCheckboxes}>
            {types.map((type) => (
              <label key={type} className={classes.checkboxLabel}>
                <input
                  type="checkbox"
                  className={classes.checkbox}
                  value={type}
                  onChange={() => handleTypeChange(type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className={classes.accordion}>
          <h4 className={classes.accordionHeader} onClick={toggleCategories}>
            Categories
          </h4>
          <div className={classes.accordionContent}>
            <div className={classes.categoryCheckboxes}>
              {categories.map((category) => (
                <label key={category} className={classes.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={classes.checkbox}
                    value={category}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;

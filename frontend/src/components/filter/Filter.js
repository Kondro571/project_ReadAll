import React, { useState } from 'react';
import "./filter.css";
function Filter({ categories, types, onFilterChange }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
  
    const handleCategoryChange = (category) => {
      setSelectedCategories(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    };
  
    const handleTypeChange = (type) => {
      setSelectedTypes(prev =>
        prev.includes(type)
          ? prev.filter(t => t !== type)
          : [...prev, type]
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
  
    return (
      <div className="filter">
        <h3>Filter Products</h3>
  
        <div>
          <h4>Categories</h4>
          {categories.map(category => (
            <label key={category}>
              <input
                type="checkbox"
                value={category}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
  
        <div>
          <h4>Types</h4>
          {types.map(type => (
            <label key={type}>
              <input
                type="checkbox"
                value={type}
                onChange={() => handleTypeChange(type)}
              />
              {type}
            </label>
          ))}
        </div>
  
        <div>
          <h4>Price</h4>
          <label>
            Min:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            Max:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </div>
  
        <button onClick={handleFilterChange}>Apply Filters</button>
      </div>
    );
  }
  
  export default Filter;
  
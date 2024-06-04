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
    const toggleCategories = () => {
      const content = document.querySelector('.accordion-content');
      content.classList.toggle('show');
  };
  
  
    return (

    <div className="filter">
        <h3>Filter Products</h3>
        <div className="button-container">
            <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
        <div className="filter-options">
          

        <div className="price-filter">
            <h4>Price</h4>
            <label className="price-label">
                Min price:
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
            </label>
            <label className="price-label">
                Max price:
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </label>
        </div>


        <div className='type-filter'>
            <h4>Types</h4>
            <div className="type-checkboxes">
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
        </div>


        <div className="accordion">
            <h4 className="accordion-header" onClick={toggleCategories}>Categories</h4>
            <div className="accordion-content">
                <div className="category-checkboxes">
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
            </div>
        </div>
    

    

    </div>
  
   
</div>

  
    );
  }
  
  export default Filter;
  
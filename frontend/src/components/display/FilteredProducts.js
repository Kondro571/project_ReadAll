import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Display from './display';
import "./filteredProduct.css";

function FilteredProducts({ products,category,type }) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {


    const filtered = products.filter(product => {
      const matchesCategory = product.categories.some(c => c && c.name === category);
      const matchesType = product.type === type;
      return matchesCategory && matchesType;
    });

    setFilteredProducts(filtered);
  }, [products]);

  return (
    <div className='filtered-product'>
      <h2>Filtered Products</h2>
      <Display products={filteredProducts} />
    </div>
  );
}

export default FilteredProducts;

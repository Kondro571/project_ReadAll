import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss'; // Import react-jss
import Display from './display';

// Tworzymy style za pomocą react-jss
const useStyles = createUseStyles({
  filteredProduct: {
    paddingTop: 130,
  },
});

function FilteredProducts({ products, category, type }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const classes = useStyles(); // Hook do stylów

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = product.categories.some(c => c && c.name === category);
      const matchesType = product.type === type;
      return matchesCategory && matchesType;
    });

    setFilteredProducts(filtered);
  }, [products, category, type]); // Zmienione: teraz uwzględnia także category i type w zależności

  return (
    <div className={classes.filteredProduct}>
      <h2>Filtered Products</h2>
      <Display products={filteredProducts} />
    </div>
  );
}

export default FilteredProducts;

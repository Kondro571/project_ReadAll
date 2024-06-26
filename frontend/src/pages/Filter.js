import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/header/Header';
import Display from '../components/display/display';
import Filter from '../components/filter/Filter';
import Product from '../models/productModel';
import Category from '../models/categoryModel';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState(['Book', 'Manga', 'Comic']); // Typy produktów

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        // Pobieranie unikalnych kategorii
        const categories = data.flatMap(productData => productData.categories);
        const uniqueCategories = Array.from(new Set(categories.map(c => c.name)));
  
        // Modyfikowanie produktów z przypisanymi kategoriami
        const fetchedProducts = data.map(productData =>
          new Product(
            productData.id,
            productData.image,
            productData.name,
            productData.description,
            productData.price,
            productData.author,
            productData.type,
            productData.categories // Bezpośrednie przypisanie kategorii
          )
        );
  

        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  const handleFilterChange = (filters) => {
    const { categories, types, minPrice, maxPrice } = filters;
  
    const filtered = products.filter(product => {
      const matchesCategory = categories.length === 0 || product.categories.some(c => {
        if (c) {
          return categories.includes(c.name);
        } else {
          return false;
        }
      });
      const matchesType = types.length === 0 || types.includes(product.type);
      const matchesPrice = (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice);
      return matchesCategory && matchesType && matchesPrice;
    });
  
    setFilteredProducts(filtered);
  };
  
  

  return (
    <>
      <Header/>
      <dive className="filter-main">
      <Filter categories={categories} types={types} onFilterChange={handleFilterChange}/>
      <Display products={filteredProducts}/>
      </dive>
    </>
  );
}

export default App;

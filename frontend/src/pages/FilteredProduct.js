import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/header/Header';
import Display from '../components/display/display';
import Product from '../models/productModel';
import FilteredProducts from '../components/display/FilteredProducts';
import { useLocation } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState(['Book', 'Manga', 'Comic']); 

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();

  const category = query.get('category');
  const type = query.get('type');
  console.log(category, type);
  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        const categories = data.flatMap(productData => productData.categories);
        const uniqueCategories = Array.from(new Set(categories.map(c => c.name)));
  
        const fetchedProducts = data.map(productData =>
          new Product(
            productData.id,
            productData.image,
            productData.name,
            productData.description,
            productData.price,
            productData.author,
            productData.type,
            productData.categories 
          )
        );
  
        console.log(fetchedProducts);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  return (
    <>
      <Header/>
      <FilteredProducts products={products} category={category} type={type}/>
    </>
  );
}

export default App;

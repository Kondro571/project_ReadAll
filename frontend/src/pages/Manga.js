import { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Top from '../components/top/topSell';
import Display from '../components/display/displayAll';
import Product from '../models/productModel';
import Category from '../models/categoryModel';
import CategoryComp from '../components/category/categoryManga';


function App() {

  const [mangas, setMangas] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        const categories = [];
        data.forEach(productData => {
          productData.categories.forEach(categoryData => {
            const category = new Category(
              categoryData.id,
              categoryData.name,
              categoryData.description
            );
            categories.push(category);
          });
        });

        const fetchedProducts = data.map(productData =>
          new Product(
            productData.id,
            productData.image,
            productData.name,
            productData.description,
            productData.price,
            productData.quantity,
            productData.author,
            productData.type,
            productData.categories
          )
        );

        fetchedProducts.forEach(product => {
          product.categories = product.categories.map(categoryId => categories.find(category => category.id === categoryId));
        });

        // setProducts(fetchedProducts);
        setMangas(fetchedProducts.filter(product => product.type === 'Manga'));

      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <Header/>
      <Top products={mangas}/>
      <CategoryComp/>
    </>
  );
}

export default App;


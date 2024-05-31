import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/header/Header';
import BasketComp from '../components/basket/basket';
import Product from '../models/productModel';
import Category from '../models/categoryModel';
import Basket from '../models/BasketModel';
import { getAuthToken } from "../services/BackendService"; // Upewnij się, że masz tę funkcję


function App() {
  const [basket, setBasket] = useState(null);

  useEffect(() => {
    fetchBasketData();
  }, []);

  const fetchBasketData = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('JWT token not found');
      }

      const response = await fetch('http://localhost:8080/baskets/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch basket data');
      }

      const data = await response.json();
      console.log(data);
      setBasket(data); 
    } catch (error) {
      console.error('Error fetching basket data:', error);
    }
  };

  return (
    <>
      <Header />
      <BasketComp basket={basket} />
    </>
  );
}

export default App;

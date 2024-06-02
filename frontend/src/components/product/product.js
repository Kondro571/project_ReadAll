import React, { useState, useEffect } from 'react';
import placeholder from "./../../images/placeholder.png";
import { getAuthToken } from "../../services/BackendService"; // Upewnij się, że masz tę funkcję

import "./product.css";

function Product({ product }) {
  const { id, name, author, coverImage, price, categories } = product;
  const [isModalOpen, setIsModalOpen] = useState(false); // Stan do kontroli modalu
  const [modalMessage, setModalMessage] = useState(""); // Stan do przechowywania komunikatu w modalu
  const [isInBasket, setIsInBasket] = useState(false); // Stan do sprawdzania czy produkt jest w koszyku
  
  
  useEffect(() => {
    checkIfProductIsInBasket();
  }, []); // Pusty array zapewnia, że funkcja uruchamia się tylko raz po pierwszym renderze

  const checkIfProductIsInBasket = async () => {
    const token = getAuthToken();

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/baskets/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch basket');
      }

      const basket = await response.json();
      console.log(basket);
      const productInBasket = basket.some(item => item.product.id === id);
      console.log("cos: ".productInBasket);

      setIsInBasket(productInBasket);
    } catch (error) {
      console.error('Error checking product in basket:', error);
    }
  };

  const handleAddToBasket = async () => {
    const token = getAuthToken();

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const basketItem = {
      productId: id,
      quantity: 1 // Możesz dodać logikę do ustawienia ilości
    };

    try {
      const response = await fetch('http://localhost:8080/baskets/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(basketItem)
      });

      if (!response.ok) {
        throw new Error('Failed to add product to basket');
      }

      setModalMessage("Product added to basket successfully!");
      setIsModalOpen(true);
      setIsInBasket(true); // Zaktualizuj stan po dodaniu produktu do koszyka
    } catch (error) {
      console.error('Error adding product to basket:', error);
      setModalMessage("Failed to add product to basket.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-details">


      <div className='product-display'>
        <div className="product-image">
          <img src={`/images/${product.image}` || placeholder} alt={name} />
          
        </div>
        <div className="product-info">
          <h2>{name}</h2>
          <p>Author: {author}</p>
          <p>Genre(s): {categories.map(category => category.name).join(', ')}</p> {/* Wyświetlanie kategorii */}
        </div>
      </div>
      <div className="product-price">
        <p>price: ${price}</p>
        <button onClick={handleAddToBasket} disabled={isInBasket}>
          {isInBasket ? "Product already in basket" : "Add to Basket"}
        </button>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;

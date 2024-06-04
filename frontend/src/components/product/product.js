import React, { useState, useEffect } from 'react';
import placeholder from "./../../images/placeholder.png";
import { getAuthToken } from "../../services/BackendService";
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./product.css";

function Product({ product }) {
  const { id, name, author, coverImage, price, categories } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isInBasket, setIsInBasket] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let token = getAuthToken();

    if (token !== null) {
      setIsAuthenticated(true);

      const decoded = jwtDecode(token);
      if (decoded.role === "ADMIN") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    checkIfProductIsInBasket();
  }, []);

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
      const productInBasket = basket.some(item => item.product.id === id);

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
      quantity: 1
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

      toast.success('Product added to cart successfully!', {
        position: "top-center"
      });
      setIsInBasket(true);
    } catch (error) {
      console.error('Error adding product to basket:', error);
      toast.error('Failed to add product to cart', {
        position: "top-center"
      });

      setIsModalOpen(true);
    }
  };

  const handleDeleteProduct = async () => {
    const token = getAuthToken();

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      toast.success('Product deleted successfully!', {
        position: "top-center"
      });
      window.location.href="http://localhost:3000";

    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product', {
        position: "top-center"
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-details">
      <div className='product-display'>
        <div className="product-image">
          <img src={`http://localhost:8080/products/${product.id}/photo`} alt={product.name} /> 
        </div>
        <div className="product-info">
          <h2>{name}</h2>
          <p>Author: {author}</p>
          <p>Genre(s): {categories.map(category => category.name).join(', ')}</p>
          <p>Description: {product.description}</p>
          <p>price: ${price}</p>
          {isAdmin && (
          <button onClick={handleDeleteProduct} className="delete-button">
            Delete Product
          </button>
        )}
        </div>

      </div>
      {isAuthenticated &&(
      <div className="product-price">
        <p>price: ${price}</p>
        <button onClick={handleAddToBasket} disabled={isInBasket}>
          {isInBasket ? "Product already in basket" : "Add to Basket"}
        </button>
        
      </div>
      )}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      <ToastContainer className="custom-toast" /> 
    </div>
  );
}

export default Product;

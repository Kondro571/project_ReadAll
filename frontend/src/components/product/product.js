import React, { useState, useEffect } from 'react';
import placeholder from "./../../images/placeholder.png";
import { getAuthToken } from "../../services/BackendService";
import {jwtDecode} from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  productDetails: {
    paddingTop: "130px",
    maxWidth: "1200px",
    margin: "auto",
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#393E46", // Średni grafit jako tło
    color: "#F2F2F2", // Jasny tekst
    borderRadius: "10px",
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
    "& > div": {
      padding: "20px",
    },
  },
  productLayout: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  productDisplay: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    width: "100%",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  productImage: {
    width: "100%",
    maxWidth: "250px",
    "& img": {
      width: "100%",
      height: "auto",
      objectFit: "cover",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
      borderRadius: "8px",
    },
  },
  productInfo: {
    flex: 1,
    textAlign: "left",
    "& h2": {
      marginTop: "0",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    },
    "& p": {
      margin: "10px 0",
    },
    "@media (max-width: 768px)": {
      textAlign: "center",
    },
  },
  productPrice: {
    backgroundColor: "#F96D00", 
    border: "1px solid #393E46",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
    right:0,
    "& p": {
      margin: "5px 0",
      fontSize: "1.2em",
      fontWeight: "bold",
    },
    "& button": {
      backgroundColor: "#900101", // Ciemna czerwień
      color: "#F2F2F2", // Jasny tekst
      border: "none",
      borderRadius: "8px",
      padding: "10px 20px",
      fontSize: "1em",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#bd9a9a", // Jaśniejsza czerwień przy hoverze
      },
    },
  },
  button: {
    backgroundColor: "#F96D00", // Pomarańczowy akcent
    color: "#F2F2F2",
    border: "1px solid #393E46",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "1em",
    cursor: "pointer",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    "&:hover": {
      backgroundColor: "#ff8c33",
    },
    "@media (max-width: 768px)": {
      padding: "8px 15px",
      fontSize: "0.9em",
    },
    "@media (max-width: 480px)": {
      padding: "5px 10px",
      fontSize: "0.8em",
    },
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    "& .modalContent": {
      backgroundColor: "#393E46",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      position: "relative",
      width: "300px",
      maxWidth: "80%",
      color: "#F2F2F2",
      boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
    },
    "& .closeButton": {
      position: "absolute",
      top: "10px",
      right: "10px",
      cursor: "pointer",
      fontSize: "20px",
      color: "#F2F2F2",
      backgroundColor: "transparent",
      border: "none",
    },
  },
});



function Product({ product }) {
  const classes = useStyles();
  const { id, name, author, coverImage, price, categories } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isInBasket, setIsInBasket] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getAuthToken();

    if (token !== null) {
      setIsAuthenticated(true);
      const decoded = jwtDecode(token);
      setIsAdmin(decoded.role === "ADMIN");
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
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch basket');
      }

      const basket = await response.json();
      setIsInBasket(basket.some((item) => item.product.id === id));
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
      quantity: 1,
    };

    try {
      const response = await fetch('http://localhost:8080/baskets/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(basketItem),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to basket');
      }

      toast.success('Product added to cart successfully!', {
        position: "top-center",
      });
      setIsInBasket(true);
    } catch (error) {
      console.error('Error adding product to basket:', error);
      toast.error('Failed to add product to cart', {
        position: "top-center",
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
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      toast.success('Product deleted successfully!', {
        position: "top-center",
      });
      window.location.href = "http://localhost:3000";
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product', {
        position: "top-center",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={classes.productDetails}>
      <div className={classes.productLayout}>
        <div className={classes.productImage}>
          <img
            src={`http://localhost:8080/products/${product.id}/photo`}
            alt={product.name}
          />
        </div>
        <div className={classes.productInfo}>
          <h2>{name}</h2>
          <p>Author: {author}</p>
          <p>Genre(s): {categories.map((category) => category.name).join(', ')}</p>
          <p>Description: {product.description}</p>
          {isAdmin && (
            <button onClick={handleDeleteProduct} className={classes.button}>
              Delete Product
            </button>
          )}
        </div>
        {isAuthenticated && (
        <div className={classes.productPrice}>
          <p>Price: ${price}</p>
          <button
            onClick={handleAddToBasket}
            disabled={isInBasket}
            className={classes.button}
          >
            {isInBasket ? "Product already in basket" : "Add to Basket"}
          </button>
        </div>
            )}
      </div>
      {isModalOpen && (
        <div className={classes.modal}>
          <div className="modalContent">
            <span className="closeButton" onClick={closeModal}>
              &times;
            </span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
  
}

export default Product;

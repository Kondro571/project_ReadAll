import React, { useState, useEffect } from 'react';
import placeholder from "./../../images/placeholder.png";
import { getAuthToken } from "../../services/BackendService";
import {jwtDecode} from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  productDetails: {
    paddingTop: 130,
    width: 1000,
    display: "flex",
    marginBottom: 20,
    marginLeft: 200,
    "& .productDisplay": {
      display: "flex",
      paddingBottom: 20,
      borderBottom: "1px solid black",
    },
    "& .productImage img": {
      width: 250,
      objectFit: "cover",
      boxShadow: "3px 3px 5px black",
    },
    "& .productInfo": {
      padding: 30,
      textAlign: "left",
      "& h2": {
        marginTop: 0,
      },
    },
    "& .productPrice": {
      border: "1px solid black",
      borderRadius: 10,
      height: 100,
      width: 190,
      display: "flex",
      marginLeft: 170,
      marginTop: 50,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& p": {
        margin: 9,
      },
      "& button": {
        backgroundColor: "#900101",
        borderRadius: 10,
        color: "#ffffff",
        border: "none",
        padding: "10px 20px",
        width: 150,
        marginTop: 0,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#bd9a9a",
        },
      },
    },
  },
  button: {
    backgroundColor: "#900101",
    borderRadius: 10,
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    width: 150,
    height: 50,
    marginTop: 50,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#bd9a9a",
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
      backgroundColor: "white",
      padding: 20,
      borderRadius: 5,
      textAlign: "center",
      position: "relative",
      width: 300,
      maxWidth: "80%",
    },
    "& .closeButton": {
      position: "absolute",
      top: 10,
      right: 10,
      cursor: "pointer",
      fontSize: 20,
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
      <div className="productDisplay">
        <div className="productImage">
          <img
            src={`http://localhost:8080/products/${product.id}/photo`}
            alt={product.name}
          />
        </div>
        <div className="productInfo">
          <h2>{name}</h2>
          <p>Author: {author}</p>
          <p>Genre(s): {categories.map((category) => category.name).join(', ')}</p>
          <p>Description: {product.description}</p>
          <p>Price: ${price}</p>
          {isAdmin && (
            <button onClick={handleDeleteProduct} className={classes.button}>
              Delete Product
            </button>
          )}
        </div>
      </div>
      {isAuthenticated && (
        <div className="productPrice">
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

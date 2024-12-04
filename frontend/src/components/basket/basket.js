import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import placeholder from './../../images/placeholder.png';
import { getAuthToken } from '../../services/BackendService'; 

const useStyles = createUseStyles({

  
  product: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  productImage: {
    width: '100px',
    borderRadius: '8px',
    objectFit: 'cover',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  productInfo: {
    flex: '1',
    '& h3': {
      fontSize: '1.2em',
      marginBottom: '5px',
      color: '#333',
    },
    '& p': {
      fontSize: '0.9em',
      color: '#666',
    },
  },
  removeButton: {
    alignSelf: 'center',
    padding: '10px 15px',
    fontSize: '0.9em',
    backgroundColor: '#e63946',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#d62828',
    },
  },
 
  
  toggleButton: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
      margin: '10px 0',
      padding: '10px',
      backgroundColor: '#2a9d8f',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      textAlign: 'center',
      '&:hover': {
        backgroundColor: '#21867a',
      },
    },
  },
  hidden: {
    display: 'none',
  },
  
  cartAndSummary: {
    paddingTop: '130px',
    paddingLeft: '5%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
    maxWidth: '1200px',
    gap: '30px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  cart: {
    flex: '2',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      width: '100%',
      paddingBottom: '100px',
    },
  },
  basketSummary: {

    flex: '1',
    padding: '20px',
    borderRadius: '10px',

    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height: '200px',
    position: 'sticky',
    bottom: '20px',
    '@media (max-width: 768px)': {
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100%',
      margin: '0',
      borderRadius: '0',
      boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.2)',
      zIndex: '1000',
      height:'auto',
    },
  },
  summaryBox: {

    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '& h2': {
      marginBottom: '15px',
      color: '#333',
    },
    '& p': {
      marginBottom: '10px',
      fontSize: '1em',
      display: 'flex',
      justifyContent: 'space-between',
      color: '#555',
    },
    '@media (max-width: 768px)': {
      width: '80%',
      padding: '10px 20px',
    },
  },
  checkoutButton: {
    marginTop: '10px',
    width: '100%',
    padding: '10px 20px',
    fontSize: '1em',
    backgroundColor: '#2a9d8f',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#21867a',
    },
  },
});

function CartAndSummary({ basket }) {
  const classes = useStyles();
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);

  if (basket === null) {
    return <div>Loading...</div>;
  }

  const removeProduct = async (basketId) => {
    const token = getAuthToken();

    try {
      const response = await fetch(`http://localhost:8080/baskets/me/${basketId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        window.location.href = 'http://localhost:3000/basket';
        console.log('Product removed from basket');
      } else {
        console.error('Failed to remove product from basket');
      }
    } catch (error) {
      console.error('Error removing product from basket:', error);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    basket.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    if (calculateTotal() > 0) {
      window.location.href = 'http://localhost:3000/order';
    } else {
      alert('Nie można przejść do płatności, gdy wartość produktów wynosi 0.');
    }
  };

  return (
    <div className={classes.cartAndSummary}>
      <aside className={classes.cart}>
        {basket.map((item, index) => (
          <div className={classes.product} key={index}>
            <img
              src={`http://localhost:8080/products/${item.product.id}/photo` || placeholder}
              alt={item.product.name}
              className={classes.productImage}
            />
            <div className={classes.productInfo}>
              <h3>{item.product.name}</h3>
              <p>Author: {item.product.author}</p>
              <p>Price: ${item.product.price}</p>
              <button
                className={classes.removeButton}
                onClick={() => removeProduct(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </aside>

      <div className={classes.basketSummary}>
        <button
          className={classes.toggleButton}
          onClick={() => setIsSummaryVisible(!isSummaryVisible)}
        >
          {isSummaryVisible ? 'Hide Summary' : 'Show Summary'}
        </button>
        <div className={`${isSummaryVisible ? '' : classes.hidden}`}>
          <div className={classes.summaryBox}>
            <h2>Summary</h2>
            <p className={classes.summaryRow}>
              <span>Product Value:</span> <span>${calculateTotal()}</span>
            </p>
            <button className={classes.checkoutButton} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartAndSummary;

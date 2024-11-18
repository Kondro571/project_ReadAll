import React from 'react';
import { createUseStyles } from 'react-jss';
import placeholder from './../../images/placeholder.png';
import { getAuthToken } from '../../services/BackendService'; // Upewnij się, że masz tę funkcję

const useStyles = createUseStyles({
  cartAndSummary: {
    paddingTop: 150,
    paddingLeft: 200,
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
  },
  cart: {
    width: 400,
    marginLeft: 70,
    borderRight: '1px solid black',
  },
  product: {
    display: 'flex',
    margin: 20,
    padding: 20,
    width: '80%',
    border: '1px solid black',
    borderRadius: 10,
  },
  productImage: {
    width: 100,
    height: '100%',
    marginRight: 20,
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: '#770000',
    color: 'white',
    padding: '10px 20px',
    borderRadius: 15,
    '&:hover': {
      backgroundColor: '#c90000',
      color: 'white',
    },
  },
  basketSummary: {
    flexGrow: 1,
    padding: 20,
  },
  summaryBox: {
    position: 'fixed',
    width: 300,
    margin: 10,
    padding: '1px 20px 15px 20px',
    backgroundColor: '#efeded',
    color: '#7e7e7e',
    height: 220,
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  checkoutButton: {
    backgroundColor: '#000000',
    width: '100%',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#4d4d4d',
    },
  },
  '@media only screen and (max-width: 705px)': {
    summaryBox: {
      position: 'inherit',
      margin: 'auto',
      paddingLeft: 30,
    },
    cartAndSummary: {
      display: 'block',
      width: 'auto',
    },
    cart: {
      width: 'auto',
      border: 'none',
      margin: 'auto',
    },
    product: {
      flexDirection: 'row',
      alignItems: 'center',
      border: 'none',
      borderRadius: 0,
      borderBottom: '1px solid black',
    },
    productImage: {
      width: 100,
      marginBottom: 0,
      marginRight: 10,
    },
    productInfo: {
      paddingLeft: 10,
    },
    removeButton: {
      alignSelf: 'flex-end',
    },
  },
});

function CartAndSummary({ basket }) {
  const classes = useStyles();

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
  );
}

export default CartAndSummary;

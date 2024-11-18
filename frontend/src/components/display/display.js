import React from 'react';
import { createUseStyles } from 'react-jss'; // Import react-jss
import { Link } from 'react-router-dom';
import placeholder from "./../../images/placeholder.png";

// Tworzymy style za pomocą react-jss
const useStyles = createUseStyles({
  displayMainAll: {
    flex: 5,
  },
  displayTabMainContent: {
    margin: '0 auto',
    width: '80%',
    backgroundColor: 'rgb(93, 93, 93)',
    padding: '20px',
    paddingTop: '70px',
  },
  productCard: {
    display: 'inline-block',
    width: '250px',
    height: '300px',
    marginBottom: '20px',
    margin: '20px',
    color: 'white',
    backgroundColor: 'rgb(134, 3, 3)',
    boxShadow: '3px 3px 5px black',
  },
  productCardImage: {
    height: '150px',
    width: '100px',
    marginTop: '10px',
    boxShadow: '3px 3px 5px black',
  },
  productCardTitle: {
    textShadow: '2px 2px 3px black',
    fontSize: '20px',
  },
  '@media only screen and (max-width: 705px)': {
    displayTabsMain: {
      marginTop: '-20px',
      marginLeft: '110px',
      padding: '15px 30px',
    },
    displayTabsMainSpan: {
      fontSize: '15px',
      padding: '20px 45px',
      marginLeft: '-122px',
      marginTop: '-30px',
    },
    displayTabsMainButton: {
      padding: '15px',
      fontSize: '14px',
    },
  },
});

function Display({ products }) {
  const classes = useStyles(); // Hook do stylów

  return (
    <div className={classes.displayMainAll}>
      <div className={classes.displayTabMainContent}>
        {products.map((product, index) => (
          <Link to={`/product/${product.id}`} key={index}>
            <div className={classes.productCard}>
              <img
                src={`http://localhost:8080/products/${product.id}/photo` || placeholder}
                alt={product.name}
                className={classes.productCardImage}
              />
              <div className="product-info">
                <h3 className={classes.productCardTitle}>{product.name}</h3>
                <p>Author: {product.author}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Display;

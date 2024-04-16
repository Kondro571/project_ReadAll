import React from 'react';
import placeholder from "./../../images/placeholder.png";

import "./css/product.css";

function Product({ product }) {
  const { title, author, coverImage, price } = product;

  const handleAddToBasket = () => {

    console.log('Product added to basket:', product);
  };

  return (
    <div className="product-details">
        <div className='product-display'>
      <div className="product-image">
        <img src={placeholder} alt={title} />
      </div>
      <div className="product-info">
        <h2>{title}</h2>
        <p>Author: {author}</p>
        <p>Genre(s): fantazy, horror,romans,</p>

      </div>
      </div>
      <div className="product-price">
        <p>price: ${price}</p>
        <button onClick={handleAddToBasket}>Add to Basket</button>

      </div>
    </div>
  );
}

export default Product;

import React from 'react';

import "./css/basket.css"
import placeholder from "./../../images/placeholder.png";


function CartAndSummary({books}) {
  return (
    <div className="cart-and-summary">
      <aside className="cart">
        {books.map((book, index) => (
          <div className="product" key={index}>
            <img src={placeholder} alt={`Product ${index + 1}`} />
            <div className="product-info">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
              <button className="remove-button">Remove</button>
            </div>
          </div>
        ))}
      </aside>

      <div className="basket-summary">
        <div className="summary-box">
          <h2>Summary</h2>
          <p><span>Product Value:</span> <span className="right">$40.00</span></p>
          <p><span>Delivery from:</span> <span className="right">$5.00</span></p>
          <p><span>Total to Pay:</span> <span className="right">$45.00</span></p>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartAndSummary;

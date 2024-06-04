import React from 'react';
import placeholder from "./../../images/placeholder.png";
import { getAuthToken } from "../../services/BackendService"; // Upewnij się, że masz tę funkcję

import "./basket.css"

function CartAndSummary({ basket}) {

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
          'Authorization': `Bearer ${token}`
          
          
        }
      });



      if (response.ok) {
        window.location.href="http://localhost:3000/basket";

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
    basket.forEach(item => {
      total += item.product.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    if (calculateTotal() > 0) {
      window.location.href="http://localhost:3000/order";

    } else {

      alert("Nie można przejść do płatności, gdy wartość produktów wynosi 0.");
    }
  };

  return (
    <div className="cart-and-summary">
      <aside className="cart">
        {basket.map((item, index) => (
          <div className="product" key={index}>
            {/* <img src={`/images/${item.product.image}` || placeholder} alt={`Product ${index + 1}`} /> */}
            <img src={`http://localhost:8080/products/${item.product.id}/photo` || placeholder} alt={item.product.name} /> 

            
            <div className="product-info">
              <h3>{item.product.name}</h3>
              <p>Author: {item.product.author}</p>
              <p>Price: ${item.product.price}</p>
              <button className="remove-button" onClick={() => removeProduct(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </aside>

      <div className="basket-summary">
        <div className="summary-box">
          <h2>Summary</h2>
          <p><span>Product Value:</span> <span className="right">${calculateTotal()}</span></p>
          <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartAndSummary;

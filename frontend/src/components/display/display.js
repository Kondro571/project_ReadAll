import React, { useState } from 'react';
import placeholder from "./../../images/placeholder.png";
import "./display.css";
import { Link } from 'react-router-dom';

function Display({ products }) {
    const [activeTab, setActiveTab] = useState('book'); // Ustaw domyślną aktywną zakładkę na 'book'
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <div className="display-main">
        <div className="display-tab-main-content">
         {products.map((product, index) => (
        <Link to={`/product/${product.id}`} key={index}>
        <div className="product-card">
          <img src={`/images/${product.image}`} alt={product.name} />
          <div className="product-info">
            <h3>{product.name}</h3>
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

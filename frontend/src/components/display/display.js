import React from 'react';
import placeholder from "./../../images/placeholder.png";
import "./display.css";
import { Link } from 'react-router-dom';

function Display({ products }) {


  
    return (
      <div className="display-main-all">
        <div className="display-tab-main-content">
         {products.map((product, index) => (
        <Link to={`/product/${product.id}`} key={index}>
        <div className="product-card">
          {/* <img src={`/images/${product.image}`} alt={product.name} /> */}
          <img src={`http://localhost:8080/products/${product.id}/photo` || placeholder} alt={product.name} /> 

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

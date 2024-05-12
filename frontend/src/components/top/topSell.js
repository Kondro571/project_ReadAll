import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import placeholder from "./../../images/placeholder.png";
import "./style.css";

function TopBooksThisWeek({ products }) {
    const containerRef = useRef(null);

    const handleScroll = (direction) => {
      const container = containerRef.current;
      const scrollAmount = 340; 
  
      if (container) {
        if (direction === 'left') {
          container.scrollLeft -= scrollAmount;
        } else if (direction === 'right') {
          container.scrollLeft += scrollAmount;
        }
      }
    };

  return (
    <div className="top-this-week-container" >
      <div className="top-this-week">TOP THIS WEEK</div>
      <div className="nav-button left-nav" onClick={() => handleScroll('left')}>
        {"<"}
      </div>
      <div className="top-this-week-wrapper" ref={containerRef}>
        {products.map((product, index) => (
      <Link to={`/product/${product.id}`}>
        <div className="product-card" key={index}>
              <img src={placeholder} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Author: {product.author}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
        </Link>
        ))}
      </div>
      <div className="nav-button right-nav" onClick={() => handleScroll('right')}>
        {">"}
      </div>    
    </div>
  );
}

export default TopBooksThisWeek;

import React, { useRef } from 'react';
import placeholder from "./../../images/placeholder.png";
import "./style.css";

function TopBooksThisWeek({ books }) {
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
        {books.map((book, index) => (
          <div className="product-card" key={index}>
            <img src={placeholder} alt={book.title} />
            <div className="product-info">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="nav-button right-nav" onClick={() => handleScroll('right')}>
        {">"}
      </div>    
    </div>
  );
}

export default TopBooksThisWeek;

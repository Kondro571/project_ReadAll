import React, { useState } from 'react';
import placeholder from "./../../images/placeholder.png";
import "./css/display.css";

function Display({ books }) {
    const [activeTab, setActiveTab] = useState('book'); // Ustaw domyślną aktywną zakładkę na 'book'
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <div className="display-main">
        <div className="display-tabs-main">
          <span className="top-sell-label">NEW</span>
          <button className={activeTab === 'book' ? 'active' : ''} onClick={() => handleTabChange('book')}>Books</button>
          <button className={activeTab === 'manga' ? 'active' : ''} onClick={() => handleTabChange('manga')}>Manga</button>
          <button className={activeTab === 'comics' ? 'active' : ''} onClick={() => handleTabChange('comics')}>Comics</button>
        </div>
        <div className="display-tab-main-content">
          {activeTab === 'book' && <BookTabContent books={ books }/>}
          {activeTab === 'manga' && <MangaTabContent />}
          {activeTab === 'comics' && <ComicsTabContent books={ books }/>}
        </div>
      </div>
    );
  }
  
  function BookTabContent({ books }) {
    return(
    <div>
        {books.map((book, index) => (
          <a href='/'>
        <div className="product-card" key={index}>
          <img src={placeholder} alt={book.title} />
          <div className="product-info">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
          </div>
        </div>
        </a>
      ))}
      </div>


);
  }
  
  function MangaTabContent() {
    return <div>Zawartość zakładki z mangą</div>;
  }
  
  function ComicsTabContent({ books }) {
    return(
        <div>
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
    
    
    );
  }
  
export default Display;

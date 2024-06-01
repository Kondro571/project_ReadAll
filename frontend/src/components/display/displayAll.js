import React, { useState } from 'react';
import placeholder from "./../../images/placeholder.png";
import "./display.css";
import { Link } from 'react-router-dom';

function Display({ books, mangas, comics }) {
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
          {activeTab === 'manga' && <MangaTabContent  mangas={mangas}/>}
          {activeTab === 'comics' && <ComicsTabContent comics={ comics }/>}
        </div>
      </div>
    );
  }
  
  function BookTabContent({ books }) {
    return(
    <div>
        {books.map((book, index) => (
        <Link to={`/product/${book.id}`}>
        <div className="product-card" key={index}>
        <img src={`/images/${book.image}`} alt={book.name} />          
        <div className="product-info">
            <h3>{book.name}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
          </div>
        </div>
        </Link>
      ))}
      </div>


);
  }
  
  function MangaTabContent({ mangas }) {
    return(
      <div>
          {mangas.map((manga, index) => (
            <Link to={`/product/${manga.id}`}>
            <div className="product-card" key={index}>
            <img src={`/images/${manga.image}`} alt={manga.name} />          
            <div className="product-info">
              <h3>{manga.name}</h3>
              <p>Author: {manga.author}</p>
              <p>Price: ${manga.price}</p>
            </div>
          </div>
          </Link>
        ))}
        </div>
  
  
  );
  }
  
  function ComicsTabContent({ comics }) {
    return(
        <div>
            {comics.map((comic, index) => (
              <Link to={`/product/${comic.id}`}>            
              <div className="product-card" key={index}>
              <img src={`/images/${comic.image}`} alt={comic.name} />          
              <div className="product-info">
                <h3>{comic.name}</h3>
                <p>Author: {comic.author}</p>
                <p>Price: ${comic.price}</p>
              </div>
            </div>
            </Link>
          ))}
          </div>
    
    
    );
  }
  
export default Display;

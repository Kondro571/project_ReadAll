import React, { useState } from 'react';
import { createUseStyles } from 'react-jss'; // Import react-jss
import { Link } from 'react-router-dom';
import placeholder from "./../../images/placeholder.png";

// Tworzymy style za pomocą react-jss
const useStyles = createUseStyles({
  displayMain: {
    marginTop: '50px',
  },
  displayTabsMain: {
    position: 'absolute',
    marginTop: '-20px',
    marginLeft: '210px',
    padding: '15px 30px',
    alignItems: 'flex-start',
  },
  topSellLabel: {
    position: 'absolute',
    color: 'aliceblue',
    fontSize: '20px',
    padding: '30px 55px',
    backgroundColor: 'rgb(110, 3, 3)',
    marginLeft: '-154px',
    marginTop: '-30px',
  },
  displayTabsMainButton: {
    color: 'aliceblue',
    backgroundColor: 'rgb(204, 8, 8)',
    padding: '15px',
    fontSize: '20px',
    border: 'none',
    boxShadow: '2px 4px 4px black',
  },
  displayTabsMainButtonHover: {
    backgroundColor: 'rgb(98, 3, 3)',
    boxShadow: '2px 4px 10px black',
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
    topSellLabel: {
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

function Display({ books, mangas, comics }) {
  const [activeTab, setActiveTab] = useState('book');
  const classes = useStyles(); // Hook do stylów
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className={classes.displayMain}>
      <div className={classes.displayTabsMain}>
        <span className={classes.topSellLabel}>NEW</span>
        <button
          className={`${classes.displayTabsMainButton} ${activeTab === 'book' ? 'active' : ''}`}
          onClick={() => handleTabChange('book')}
        >
          Books
        </button>
        <button
          className={`${classes.displayTabsMainButton} ${activeTab === 'manga' ? 'active' : ''}`}
          onClick={() => handleTabChange('manga')}
        >
          Manga
        </button>
        <button
          className={`${classes.displayTabsMainButton} ${activeTab === 'comics' ? 'active' : ''}`}
          onClick={() => handleTabChange('comics')}
        >
          Comics
        </button>
      </div>
      <div className={classes.displayTabMainContent}>
        {activeTab === 'book' && <BookTabContent books={books} />}
        {activeTab === 'manga' && <MangaTabContent mangas={mangas} />}
        {activeTab === 'comics' && <ComicsTabContent comics={comics} />}
      </div>
    </div>
  );
}

function BookTabContent({ books }) {
  const classes = useStyles(); // Hook do stylów

  return (
    <div>
      {books.map((book, index) => (
        <Link to={`/product/${book.id}`} key={index}>
          <div className={classes.productCard}>
            <img src={`http://localhost:8080/products/${book.id}/photo`} alt={book.name} className={classes.productCardImage} />
            <div className="product-info">
              <h3 className={classes.productCardTitle}>{book.name}</h3>
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
  const classes = useStyles(); // Hook do stylów

  return (
    <div>
      {mangas.map((manga, index) => (
        <Link to={`/product/${manga.id}`} key={index}>
          <div className={classes.productCard}>
            <img src={`http://localhost:8080/products/${manga.id}/photo`} alt={manga.name} className={classes.productCardImage} />
            <div className="product-info">
              <h3 className={classes.productCardTitle}>{manga.name}</h3>
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
  const classes = useStyles(); // Hook do stylów

  return (
    <div>
      {comics.map((comic, index) => (
        <Link to={`/product/${comic.id}`} key={index}>
          <div className={classes.productCard}>
            <img src={`http://localhost:8080/products/${comic.id}/photo`} alt={comic.name} className={classes.productCardImage} />
            <div className="product-info">
              <h3 className={classes.productCardTitle}>{comic.name}</h3>
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

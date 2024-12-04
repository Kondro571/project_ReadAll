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
    color: '#FFFFFF', // Zmieniono na czystą biel
    fontSize: '20px',
    padding: '30px 55px',
    backgroundColor: '#eb510a', // Pomarańczowy akcent
    marginLeft: '-154px',
    marginTop: '-30px',
  },
  displayTabsMainButton: {
    color: '#FFFFFF', // Zmieniono na czystą biel
    backgroundColor: '#393E46', // Ciemny grafit
    padding: '15px',
    fontSize: '20px',
    border: 'none',
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.5)', // Zmniejszono intensywność cienia
    transition: 'background-color 0.3s ease',
    "&:hover": {
      backgroundColor: '#F96D00', // Pomarańczowy przy hoverze
    },
  },
  displayTabMainContent: {
    margin: '0 auto',
    width: '80%',
    backgroundColor: '#ECECEC', // Jasnoszare tło dla treści
    padding: '20px',
    paddingTop: '70px',
    borderRadius: '8px', // Dodano zaokrąglenia rogów
  },
  productCard: {
    display: 'inline-block',
    width: '250px',
    height: '300px',
    marginBottom: '20px',
    margin: '20px',
    color: '#FFFFFF', // Tekst na biało
    backgroundColor: '#393E46', // Ciemny grafit
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)', // Delikatniejszy cień
    transition: 'transform 0.3s ease',
    "&:hover": {
      transform: 'scale(1.05)', // Subtelny efekt powiększenia na hover
      backgroundColor: '#F96D00', // Zmiana koloru na pomarańczowy
    },
  },
  productCardImage: {
    height: '150px',
    width: '100px',
    marginTop: '10px',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Delikatniejszy cień
    borderRadius: '5px', // Dodano zaokrąglenia rogów
  },
  productCardTitle: {
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Zmniejszono intensywność cienia
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
  const classes = useStyles();

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
        {activeTab === 'book' && <TabContent items={books} />}
        {activeTab === 'manga' && <TabContent items={mangas} />}
        {activeTab === 'comics' && <TabContent items={comics} />}
      </div>
    </div>
  );
}

function TabContent({ items }) {
  const classes = useStyles();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {items.map((item, index) => (
        <Link to={`/product/${item.id}`} key={index} style={{ textDecoration: 'none' }}>
          <div className={classes.productCard}>
            <img
              src={`http://localhost:8080/products/${item.id}/photo`}
              alt={item.name}
              className={classes.productCardImage}
            />
            <h3 className={classes.productCardTitle}>{item.name}</h3>
            <p>Author: {item.author}</p>
            <p>Price: ${item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Display;

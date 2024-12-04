import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  topThisWeekContainer: {
    position: "relative",
    paddingTop: "170px",
    margin: "auto",
  },
  topThisWeek: {
    position: "absolute",
    marginTop: "-30px",
    padding: "15px 30px",
    backgroundColor: "#F96D00", // Pomarańczowy akcent
    border: "1px solid #393E46", // Średni grafit
    fontSize: "large",
    color: "#F2F2F2", // Jasny tekst
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  wrapper: {
    display: "flex",
    overflowX: "hidden",
    flexWrap: "nowrap",
    padding: "10px",
    backgroundColor: "#dbdbdb", // Ciemny grafit jako tło
    height: "250px",
    paddingLeft: "70px",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
    },
  },
  productCard: {
    backgroundColor: "#393E46", // Średni grafit
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
    width: "300px",
    height: "200px",
    flex: "0 0 auto",
    marginRight: "40px",
    display: "flex",
    borderRadius: "8px",
    color: "#F2F2F2", // Jasny tekst
    "&:hover": {
      backgroundColor: "#F96D00", // Pomarańczowy przy hoverze
    },
  },
  productImage: {
    margin: "10px",
    width: "130px",
    height: "170px",
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
    borderRadius: "5px",
  },
  productInfo: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "10px",
    "& h3": {
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
      fontSize: "20px",
    },
  },
  navButton: {
    position: "absolute",
    top: "70%", // Wyśrodkowanie przycisku w pionie
    transform: "translateY(-50%)", // Korekta dla idealnego wyśrodkowania
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    fontSize: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "20px",
    userSelect: "none", // Zapobieganie zaznaczaniu
    "&:hover": {
      backgroundColor: "rgba(249, 109, 0, 0.7)", // Efekt hover
    },
  },
  leftNav: {
    left: "10px", // Odstęp od lewej krawędzi
  },
  rightNav: {
    right: "10px", // Odstęp od prawej krawędzi
  },
});


function TopBooksThisWeek({ products }) {
  const classes = useStyles();
  const containerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 340;

    if (container) {
      container.scrollTo({
        left: direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount,
        behavior: "smooth", // Płynne przewijanie
      });
    }
  };

  return (
    <div className={classes.topThisWeekContainer}>
      <div className={classes.topThisWeek}>TOP THIS WEEK</div>
      <div className={`${classes.navButton} ${classes.leftNav}`} onClick={() => handleScroll("left")}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
        </svg>
      </div>
      <div className={classes.wrapper} ref={containerRef}>
        {products.map((product, index) => (
          <Link to={`/product/${product.id}`} key={index}>
            <div className={classes.productCard}>
              <img
                src={`http://localhost:8080/products/${product.id}/photo`}
                alt={product.name}
                className={classes.productImage}
              />
              <div className={classes.productInfo}>
                <h3>{product.name}</h3>
                <p>Author: {product.author}</p>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={`${classes.navButton} ${classes.rightNav}`} onClick={() => handleScroll("right")}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12l-4.58-4.59L10 6l6 6-6 6z" />
        </svg>
      </div>
    </div>
  );
}

export default TopBooksThisWeek;


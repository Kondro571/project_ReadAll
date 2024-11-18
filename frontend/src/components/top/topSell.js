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
    backgroundColor: "#c70202",
    border: "1px solid #000000",
    fontSize: "large",
    color: "#fff",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
    zIndex: 1,
  },
  wrapper: {
    display: "flex",
    overflowX: "hidden",
    flexWrap: "nowrap",
    padding: "10px",
    backgroundColor: "rgb(56, 56, 56)",
    height: "250px",
    paddingLeft: "150px",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
    },
  },
  productCard: {
    backgroundColor: "rgb(134, 3, 3)",
    boxShadow: "3px 3px 5px black",
    width: "300px",
    height: "200px",
    flex: "0 0 auto",
    marginRight: "40px",
    display: "flex",
    borderRadius: "8px",
    color: "white",
  },
  productImage: {
    margin: "10px",
    width: "130px",
    height: "170px",
    boxShadow: "2px 2px 5px black",
  },
  productInfo: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "10px",
    "& h3": {
      textShadow: "5px 5px 5px black",
      fontSize: "20px",
    },
  },
  navButton: {
    position: "absolute",
    top: "65%",
    margin: "10px",
    transform: "translateY(-50%)",
    width: "70px",
    height: "70px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    fontSize: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "20px",
  },
  leftNav: {
    left: 0,
  },
  rightNav: {
    right: 0,
  },
});

function TopBooksThisWeek({ products }) {
  const classes = useStyles();
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
    <div className={classes.topThisWeekContainer}>
      <div className={classes.topThisWeek}>TOP THIS WEEK</div>
      <div className={`${classes.navButton} ${classes.leftNav}`} onClick={() => handleScroll('left')}>
        {"<"}
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
      <div className={`${classes.navButton} ${classes.rightNav}`} onClick={() => handleScroll('right')}>
        {">"}
      </div>
    </div>
  );
}

export default TopBooksThisWeek;

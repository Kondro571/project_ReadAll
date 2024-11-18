import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss'; 
import img from "./../../images/placeholder.png";

// Stworzenie hooka useStyles
const useStyles = createUseStyles({
  categoryContainer: {
    paddingTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0px 150px',
  },
  categoryTitle: {
    textAlign: 'left',
    fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
    fontSize: 40,
    marginLeft: 140,
    paddingTop: 20,
  },
  categoryTile: {
    flex: '0 0 calc(33.33% - 30px)',
    padding: 10,
    position: 'relative',
    borderBottom: '1px solid gray',
    '&:nth-child(3n - 1), &:nth-child(3n + 1), &:nth-child(3n + 2)': {
      borderRight: '1px solid gray',
    },
    '& p':{
      color:'black',
    },
    '& h1':{
      color:'black',
    },
  },
  categoryTileLink: {
    textDecoration: 'none',
    fontSize: 20,
  },
  categoryTileHeading: {
    fontSize: 45,
  },
  categoryTileImage: {
    width: 200,
    height: 150,
  },
  '@media screen and (max-width: 768px)': {
    categoryContainer: {
      margin: '0px 50px',
    },
    categoryTileImage: {
      width: 200,
      height: 140,
    },
    categoryTile: {
      flex: '0 0 calc(50% - 30px)',
      padding: 9,
    },
    categoryTileHeading: {
      margin: '0 auto',
    },
    categoryTile: {
      borderBottom: '1px solid gray',
      '&:nth-child(n)': {
        borderRight: 'none',
      },
    },
    '&:nth-child(2n - 1)': {
      borderRight: '1px solid gray',
    },
  },
});

const Category = () => {
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.categoryTitle}>Category:</h1>
      <div className={classes.categoryContainer}>
        <div className={classes.categoryTile}>
          <Link to='/filtered-products?category=Shonen&type=Book' className={classes.categoryTileLink}>
            <img src={img} alt="Category Image" className={classes.categoryTileImage} />
            <p>Shonen</p>
          </Link>
        </div>
        <div className={classes.categoryTile}>
          <Link to='/filtered-products?category=Fiction&type=Book' className={classes.categoryTileLink}>
            <img src={img} alt="Category Image" className={classes.categoryTileImage} />
            <p>Fiction</p>
          </Link>
        </div>
        <div className={classes.categoryTile}>
          <Link to='/filtered-products?category=Romance&type=Book' className={classes.categoryTileLink}>
            <img src={img} alt="Category Image" className={classes.categoryTileImage} />
            <p>Romance</p>
          </Link>
        </div>
        <div className={classes.categoryTile}>
          <Link to='/filtered-products?category=Adventure&type=Book' className={classes.categoryTileLink}>
            <img src={img} alt="Category Image" className={classes.categoryTileImage} />
            <p>Adventure</p>
          </Link>
        </div>
        <div className={classes.categoryTile}>
          <Link to='/filtered-products?category=Seinen&type=Book' className={classes.categoryTileLink}>
            <img src={img} alt="Category Image" className={classes.categoryTileImage} />
            <p>Seinen</p>
          </Link>
        </div>
        <div className={classes.categoryTile}>
          <Link to='/filter' className={classes.categoryTileLink}>
            <h1>Advence<br />search</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Category;

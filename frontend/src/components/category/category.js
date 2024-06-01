import React from 'react';
import { Link } from 'react-router-dom';
import "./category.css"; 
import img from "./../../images/placeholder.png";

const Category = () => {
  return (
    <>
      <h1 className='category-title'>Category:</h1>
      <div className="category-container">
        <div className="category-tile">
          <Link to='/filtered-products?category=Fantasy&type=Book'>
            <img src={img} alt="Category Image" />
            <p>Fantasy</p>
          </Link>
        </div>
        <div className="category-tile">
          <Link to='/filtered-products?category=Fiction&type=Book'>
            <img src={img} alt="Category Image" />
            <p>Fiction</p>
          </Link>
        </div>
        <div className="category-tile">
          <Link to='/filtered-products?category=Romance&type=Book'>
            <img src={img} alt="Category Image" />
            <p>Romance</p>
          </Link>
        </div>
        <div className="category-tile">
          <Link to='/filtered-products?category=Horror&type=Book'>
            <img src={img} alt="Category Image" />
            <p>Horror</p>
          </Link>
        </div>
        <div className="category-tile">
          <Link to='/filtered-products?category=Science fiction&type=Book'>
            <img src={img} alt="Category Image" />
            <p>Science fiction</p>
          </Link>
        </div>
        <div className="category-tile">
          <Link to='/filter'>
            <h1>Advence<br></br>search</h1>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Category;

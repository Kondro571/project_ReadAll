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
            <p>Kategoria 1</p>
          </Link>
        </div>
        <div className="category-tile">
          <Link to='/filtered-products?category=Kategoria 2&type=Book'>
            <img src={img} alt="Category Image" />
            <p>Kategoria 2</p>
          </Link>
        </div>
        <div className="category-tile">
          <Link to='/filtered-products?category=Kategoria 3&type=Book'>
            <img src={img} alt="Category Image" />
            <p>Kategoria 3</p>
          </Link>
        </div>
        <div className="category-tile">
          <Link to='/filtered-products?category=Kategoria 4&type=Book'>
            <img src={img} alt="Category Image" />
            <p>Kategoria 4</p>
          </Link>
        </div>
        <div className="category-tile">
          <Link to='/filtered-products?category=Kategoria 5&type=Book'>
            <img src={img} alt="Category Image" />
            <p>Kategoria 5</p>
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

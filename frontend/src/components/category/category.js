import React from 'react';
import "./css/category.css"; 
import img from "./../../images/placeholder.png"
const Category = () => {
  return (
    <>
    <h1 className='category-title'>Category:</h1>
    <div className="category-container">
      
      <div className="category-tile">
        <a href='/'>
        <img src={img} alt="Category Image" />
        <p>Kategoria 1</p>
        </a>
      </div>
      <div className="category-tile">
      <a href='/'>
        <img src={img} alt="Category Image" />
        <p>Kategoria 2</p>
        </a>

      </div>
      <div className="category-tile">
      <a href='/'>
        <img src={img} alt="Category Image" />
        <p>Kategoria 3</p>
        </a>

      </div>
      <div className="category-tile">
      <a href='/'>
        <img src={img} alt="Category Image" />
        <p>Kategoria 4</p>
        </a>

      </div>
      <div className="category-tile">
      <a href='/'>
        <img src={img} alt="Category Image" />
        <p>Kategoria 5</p>
        </a>

      </div>
      <div className="category-tile">
      <a href='/'>
        <h1>Advence<br></br>search</h1>
        </a>

      </div>
      
    </div>
    </>
  );
}

export default Category;

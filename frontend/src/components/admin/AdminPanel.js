import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    author: '',
    type: 'Book',
    categories: [],
    image: null,
  });
  const [availableCategories, setAvailableCategories] = useState([]);
  const types = ['Book', 'Manga', 'Comic'];

  useEffect(() => {
    // Fetch categories from backend
    fetch('http://localhost:8080/categories')
      .then(response => response.json())
      .then(data => setAvailableCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
    setProduct((prevProduct) => ({
      ...prevProduct,
      categories: selectedCategories,
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save the image file
    const formData = new FormData();
    formData.append('image', product.image);

    try {
        const imageResponse = await fetch('http://localhost:8080/upload-image', {
          method: 'POST',
          body: formData,
        });
  
        if (!imageResponse.ok) {
          throw new Error('Image upload failed');
        }

      // Handle product data submission to backend
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
          author: product.author,
          type: product.type,
          categories: product.categories,
          image: product.image.name, // Save only the image name
        }),
      });

      if (response.ok) {
        alert('Product added successfully');
        setProduct({
          name: '',
          description: '',
          price: '',
          author: '',
          type: 'Book',
          categories: [],
          image: null,
        });
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" value={product.author} onChange={handleChange} required />
        
        <select name="type" value={product.type} onChange={handleChange} required>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select name="categories" multiple value={product.categories} onChange={handleCategoryChange} required>
          {availableCategories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>

        <input type="file" name="image" onChange={handleImageChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;

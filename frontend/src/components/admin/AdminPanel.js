import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { ToastContainer, toast } from 'react-toastify';
import { getAuthToken } from "../../services/BackendService";
import 'react-toastify/dist/ReactToastify.css';

const useStyles = createUseStyles({
  addProduct: {
    margin: 'auto',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 8,
    maxWidth: 400,
    backgroundColor: '#f9f9f9',
    paddingTop: 130,
  },
  title: {
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
    '&::file-selector-button': {
      fontWeight: 'bold',
      color: '#F96D00',
      padding: 7,
      border: 'thin solid grey',
      borderRadius: 3,
      '&:hover': {
        backgroundColor: '#ebe4e1',
      },
    },
  },
  button: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F96D00',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#FF8C33',
        },
  },
  toast: {
    fontSize: '14px !important',
  },
});

const customToastContainer = {
  position: "top-right", // Pozycja na dole, na środku
  autoClose: 5000, // Czas wyświetlania powiadomienia (5 sekund)
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  limit: 1, // Możesz ograniczyć liczbę powiadomień
  style: {
    marginBottom: '25px', // Ustawienie odstępu pomiędzy powiadomieniami
    padding: '10px', // Ustawienie paddingu dla samego powiadomienia
    paddingTop: '130px', // Ustawienie
  },
};

function AddProduct() {
  const classes = useStyles();

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
    fetch('http://localhost:8080/categories')
      .then((response) => response.json())
      .then((data) => setAvailableCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
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

    const formData = new FormData();
    formData.append('image', product.image);

    const token = getAuthToken();

    try {
      const imageResponse = await fetch('http://localhost:8080/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!imageResponse.ok) {
        throw new Error('Image upload failed');
      }

      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
          author: product.author,
          type: product.type,
          categories: product.categories,
          image: product.image.name,
        }),
      });

      if (response.ok) {
        toast.success('Product added successfully!', {
          position: 'top-center',
        });
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
        toast.error('Failed to add product', {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error adding product', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className={classes.addProduct}>
      <h2 className={classes.title}>Add New Product</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
          required
          className={classes.input}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
          className={classes.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className={classes.input}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={product.author}
          onChange={handleChange}
          required
          className={classes.input}
        />
        <select
          name="type"
          value={product.type}
          onChange={handleChange}
          required
          className={classes.input}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          name="categories"
          multiple
          value={product.categories}
          onChange={handleCategoryChange}
          required
          className={classes.input}
        >
          {availableCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          required
          className={classes.input}
        />
        <button type="submit" className={classes.button}>
          Add Product
        </button>
      </form>
      <ToastContainer {...customToastContainer} />

    </div>
  );
}

export default AddProduct;

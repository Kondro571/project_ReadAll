import React, { useState, useEffect } from "react";
import { getAuthToken } from "../../services/BackendService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  formContainer: {
    backgroundColor: "#393E46",
    color: "#F2F2F2",
    maxWidth: "600px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    "& label": {
      fontWeight: "bold",
      marginBottom: "5px",
    },
    "& input, & textarea, & select": {
      width: "95%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#F2F2F2",
      fontSize: "1em",
    },
    "& textarea": {
      minHeight: "100px",
      resize: "vertical",
    },
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    "& button": {
      padding: "10px 20px",
      fontSize: "1em",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    "& button[type='submit']": {
      backgroundColor: "#F96D00",
      color: "#F2F2F2",
      "&:hover": {
        backgroundColor: "#ff8c33",
      },
    },
    "& button[type='button']": {
      backgroundColor: "#6c757d",
      color: "#F2F2F2",
      "&:hover": {
        backgroundColor: "#565e64",
      },
    },
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
function EditProduct({ product, onClose, onUpdate }) {
  const classes = useStyles();

  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    author: product.author,
    type: product.type,
    categories: product.categories.map((cat) => cat.name),
    image: null,
  });
  const [availableCategories, setAvailableCategories] = useState([]);
  const types = ['Book', 'Manga', 'Comic'];

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((response) => response.json())
      .then((data) => setAvailableCategories(data))
      .catch((error) =>
        console.error("Error fetching categories:", error)
      );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setUpdatedProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleCategoryChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setUpdatedProduct((prev) => ({ ...prev, categories: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = getAuthToken();
    let updatedImage = updatedProduct.image;
  
    try {
      // Jeśli obrazek jest załączony, najpierw go prześlij
      if (updatedProduct.image instanceof File) {
        const formData = new FormData();
        formData.append('image', updatedProduct.image);
        console.log(formData);
        console.log(updatedProduct.image);
        
  
        const imageResponse = await fetch("http://localhost:8080/upload-image", {
          method: "POST",
          body: formData,
        });
        
        const textResponse = await imageResponse.text(); // Pobierz odpowiedź jako tekst
        console.log(textResponse); // Sprawdź co dokładnie zwraca serwer
        
  
        if (!imageResponse.ok) {
          throw new Error("Image upload failed");
        }
  

        updatedImage = updatedProduct.image.name; 
        console.log(updatedProduct.image.name);

      } else{
        // Jeśli obrazek jest null, użyj istniejącego
        updatedImage = product.image;
      }

      // Wyślij żądanie PUT do API
      const response = await fetch(`http://localhost:8080/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: updatedProduct.price,
          author: updatedProduct.author,
          type: updatedProduct.type,
          categories: updatedProduct.categories,
          image: updatedImage, // Użyj zaktualizowanego lub istniejącego obrazu
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
  
      toast.success("Product updated successfully!");
      onUpdate(); // Funkcja odświeżająca dane w widoku rodzica
      onClose(); // Zamknij formularz
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <form className={classes.formContainer} onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={updatedProduct.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={updatedProduct.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={updatedProduct.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={updatedProduct.author}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Categories:</label>
        <select
          multiple
          value={updatedProduct.categories}
          onChange={handleCategoryChange}
        >
          {availableCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
      <select
          name="type"
          value={product.type}
          onChange={handleInputChange}
          required
          className={classes.input}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />
      </div>
      <div className={classes.buttonsContainer}>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
              <ToastContainer {...customToastContainer} />
    </form>
  );
}

export default EditProduct;

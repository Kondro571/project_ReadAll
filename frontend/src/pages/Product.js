// import Header from '../components/header/Header'
// import Top from '../components/top/topSell';
// import Product from '../components/product/product';
import { useParams } from 'react-router-dom';

// function ProductPage() {
//   const param=useParams();
//     const product = {
//         title: 'Title',
//         author: 'aaa',
//         coverImage: './images/placeholder.jpg',
//         price: param.
//       };

//   return (
//     <>
//      <Header/>

//         <Product product={product}/>
//     </>
//   );
// }

// export default ProductPage;
import { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Product from '../components/product/product';
import ProductModel from '../models/productModel';
import CategoryModel from '../models/categoryModel';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const param=useParams();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/${param.prodId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();

        // Przekształć dane produktu na obiekt ProductModel
        const productModel = new ProductModel(
          data.id,
          data.image,
          data.name,
          data.description,
          data.price,
          data.quantity,
          data.author,
          data.type,
          data.categories.map(categoryData => new CategoryModel(
            categoryData.id,
            categoryData.name,
            categoryData.description
          ))
        );
        
        setProduct(productModel);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [param.prodId]);

  return (
    <>
      <Header />
      {product && <Product product={product} />}
    </>
  );
}

export default ProductPage;

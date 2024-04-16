import '../App.css';
import Header from '../components/header/Header'
import Top from '../components/top/topSell';
import Product from '../components/product/product';
function App() {
    const product = {
        title: 'Title',
        author: 'Author',
        coverImage: './images/placeholder.jpg',
        price: 20.99
      };
  return (
    <>
     <Header/>

        <Product product={product}/>
    </>
  );
}

export default App;

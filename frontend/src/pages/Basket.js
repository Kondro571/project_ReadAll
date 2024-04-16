import '../App.css';
import Header from '../components/header/Header'
import Basket from '../components/basket/basket'
function App() {
  const books = [
    {
      coverImage: './images/placeholder.jpg',
      title: 'Tytuł  1',
      author: 'Autor  1',
      price: 20.99
    },
    {
      coverImage: './images/placeholder.jpg',
      title: 'Tytuł  2',
      author: 'Autor  2',
      price: 99.99
    },
    {
      coverImage: './images/placeholder.jpg',
      title: 'Tytuł  3',
      author: 'Autor  3',
      price: 99.99
    },
    {
      coverImage: './images/placeholder.jpg',
      title: 'Tytuł  4',
      author: 'Autor  4',
      price: 99.99
    },
    {
      coverImage: './images/placeholder.jpg',
      title: 'Tytuł  5',
      author: 'Autor  5',
      price: 99.99
    },
  ];
  return (
    <>
     <Header/>
     <Basket books={books}/>
     
    </>
  );
}

export default App;

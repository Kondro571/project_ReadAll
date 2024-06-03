// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cos from './pages/aa';
import Cos1 from './pages/bb';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Books from './pages/Books';
import Comics from './pages/Comics';
import Manga from './pages/Manga';

import Basket from './pages/Basket';
import ProductPage from './pages/Product';
import Admin from './pages/Admin';
import Profil from './pages/Profile';
import Filter from './pages/Filter';

import Order from './pages/Order';
import FilteredProduct from './pages/FilteredProduct';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/a' element={<Cos/>} />
          <Route exact path='/b' element={<Cos1/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/registration' element={<Registration/>} />
          <Route exact path='/books' element={<Books/>} />
          <Route exact path='/comics' element={<Comics/>} />
          <Route exact path='/manga' element={<Manga/>} />

          <Route exact path='/basket' element={<Basket/>} />
          <Route exact path='/product/:prodId' element={<ProductPage/>} />
          <Route exact path='/order' element={<Order/>} />

          <Route exact path='/admin' element={<Admin/>} />
          <Route exact path='/profile' element={<Profil/>} />
          <Route exact path='/filter' element={<Filter/>} />
          <Route path="/filtered-products" element={<FilteredProduct/>} />



          <Route exact path='*' element={<Home/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;

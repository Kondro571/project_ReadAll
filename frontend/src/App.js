// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cos from './pages/aa';
import Cos1 from './pages/bb';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Books from './pages/Books';
import Basket from './pages/Basket';
import ProductPage from './pages/Product';



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
          <Route exact path='/basket' element={<Basket/>} />
          <Route exact path='/product/:prodId' element={<ProductPage/>} />


          <Route exact path='*' element={<Home/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;

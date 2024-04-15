// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cos from './pages/aa';
import Cos1 from './pages/bb';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/a' element={<Cos/>} />
          <Route exact path='/b' element={<Cos1/>} />
          <Route exact path='*' element={<Home/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;

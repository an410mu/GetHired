import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from './components/Landing.js';
import Overview from './components/Overview.js';
import Register from './components/Register.js';
import Auth from './components/Auth.js';
import React from 'react'
//import styled from 'styled-components';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/register' element={<Register />} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/overview' element={<Overview/>} />
      <Route path='*' element={<div>Error</div>} />
    </Routes>
    </BrowserRouter>
  )

}

export default App;

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from './components/Landing.js';
import Register from './components/Register.js';

import React from 'react'
import Auth from './components/Auth.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import AllJobs from './components/main/AllJobs.js'
import AddJob from './components/main/AddJob.js'
import SharedLayout from './components/main/SharedLayout.js'
import Stats from './components/main/Stats.js'
import styled from 'styled-components';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/register' element={<Register />} />
      <Route path='/auth' element={<Auth/>} />
      {/* <Route path='/overview' element={<Overview/>} /> */}
      <Route
          path='/overview'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>

          }
        >
          <Route index element={<AllJobs />} />
          <Route path='/overview/stats' element={<Stats />} />
          <Route path='/overview/add-job' element={<AddJob />} />
        </Route>
      <Route path='*' element={<div>Error</div>} />
    </Routes>
    </BrowserRouter>
  )

}

export default App;

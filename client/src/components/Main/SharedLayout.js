import React from 'react';
import { Outlet } from 'react-router-dom'
import Wrapper from '../../styles/shared.js'
import Navbar from './Navbar.js';
import BigSidebar from './BigSidebar.js';
import SmallSidebar from './SmallSidebar.js';
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        {/* <SmallSidebar /> */}
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
        <div>hello</div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout

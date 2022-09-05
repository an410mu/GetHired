import React from 'react'
import { useAppContext } from '../../context/appContext'
//import NavLinks from './NavLinks'
import logo from '../../assets/logo.png';
import Wrapper from '../../styles/bigside.js'

const BigSidebar = () => {
  const { showSidebar } = useAppContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <div>something from bigsidebard </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar

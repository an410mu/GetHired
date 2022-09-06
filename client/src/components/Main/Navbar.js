import React from 'react'
import Wrapper from '../../styles/nav.js'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext} from '../../context/appContext'
import logo from '../../assets/logo.png';
import { useState } from 'react';

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const { toggleSidebar, user, logoutUser } = useAppContext()
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={()=> {toggleSidebar()}}>
          <FaAlignLeft />
        </button>
        <div><img src={logo} alt='logo' /></div>
        <div className='btn-container'>
          <button type='button' className='btn' onClick={ ()=> {setShowLogout(!showLogout) }}>
            <FaUserCircle/>{user.name}<FaCaretDown/>
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logoutUser}>logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar

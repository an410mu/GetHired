import React from 'react'
import Wrapper from '../../styles/nav.js'
//import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../../context/appContext'
import logo from '../../assets/logo.png';
import { useState } from 'react'
const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  // const { toggleSidebar, logoutUser, user } = useAppContext()
  return (
    <Wrapper>
      <div className='nav-center'>
        {/* <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button> */}
        <div>This is the Navbar</div>
      </div>
    </Wrapper>
  )
}

export default Navbar

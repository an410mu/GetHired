import React from 'react';
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/appContext'
import logo from '../../assets/logo.png';
import Wrapper from '../../styles/bigside.js'
import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
  { id: 1, text: 'stats', path: '/overview/stats', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all jobs', path: '/overview', icon: <MdQueryStats /> },
  { id: 3, text: 'add job', path: '/overview/add-job', icon: <FaWpforms /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
]

const BigSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
         <div className='nav-links'>{links.map( (item) => {
          const {id, text, path, icon} = item;
          return (
            <NavLink key={id} to={path} onClick={toggleSidebar}
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className='icon'>{icon}</span>{text}</NavLink>
          )
         })}</div>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar

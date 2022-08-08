import React from 'react';
import logo from '../assets/logo.png';
import main from '../assets/main.png';
import Wrapper from '../styles/landing';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logo} alt='logo' className='logo' />
      </nav>
      <div className='container page'>
          <div className='info'>
            <h1>Job Application <span>Tracking</span> Management</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque? </p>
            <button className='btn btn-hero'>Login/Register</button>
          </div>
          <img src={main} alt='background' className='img main-img' />
      </div>
    </Wrapper>
  )
}



export default Landing
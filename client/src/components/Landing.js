import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import main from '../assets/main.png';
import Wrapper from '../styles/landing';
import Sign from './Sign.js'

const Landing = () => {

  const [signForm, setSignForm] = useState(false);


  const handleSignUp = (status) => {
    console.log('button clicked')
    setSignForm(status);
  }

  return (
    <Wrapper>
      <nav>
        <img src={logo} alt='logo' className='logo' />
        <ul >
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          <li>
            <Link to='/overview'>Overview</Link>
          </li>
          <li>
            <button >Sign Up</button>
          </li>
        </ul>
      </nav>
      <div className='container page'>
          <div className='info'>
            <h1>Job Application <span>Tracking</span> Management</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque? </p>
            <button to='/register' className='btn btn-hero' onClick={()=>{handleSignUp(true)}} >Sign Up</button>
          </div>
          <img src={main} alt='background' className='img main-img' />
      </div>
      <div>
       {signForm && <Sign handleSignUp={handleSignUp}/>}

      </div>
    </Wrapper>
  )
}



export default Landing
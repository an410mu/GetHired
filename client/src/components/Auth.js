import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.png';
import Wrapper from '../styles/auth.js';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}
const Auth = () => {
  const [values, setValues] = useState(initialState);

  const changeHandler = (e) => {
    console.log(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <Wrapper className='full-page'>
      <form className='form'>
      <img src={logo} alt='logo' className='logo' />
      <h3>Login to GetHired</h3>
      <div className='form-row'>
        <label htmlFor='name' className='form-label'>Name</label>
        <input type='text' value={values.name} name='name' onChange={changeHandler} className='form-input'/>
        <label htmlFor='email' className='form-label'>Email</label>
        <input type='email' value={values.email} name='email' onChange={changeHandler} className='form-input'/>
        <label htmlFor='password' className='form-label'>Password</label>
        <input type='password' value={values.password} name='password' onChange={changeHandler} className='form-input'/>
      </div>
      <button type='submit' className='btn btn-block' onSubmit={submitHandler}>Sign In</button>
      <Link to='/' className='btn btn-block'>Cancel</Link>
      </form>
    </Wrapper>
  )
}

export default Auth;
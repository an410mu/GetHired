import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppContext} from '../context/appContext';
import logo from '../assets/logo.png';
import Wrapper from '../styles/auth.js';
import {useNavigate} from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

const Auth = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  //const state = useAppContext();
  //console.log(state);
  const { user, isLoading,showAlert, alertText, alertType, displayAlert,setupUser} = useAppContext();

  const changeHandler = (e) => {
    //console.log(e.target.name,e.target.value);
    setValues({...values, [e.target.name] : e.target.value})
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submited")
    const {name, email, password, isMember} = values;
    if (!email || !password || (!name && !isMember)) {
      displayAlert();
      return;
    }
    const curUser = {name, email, password};
    if (isMember) {
      //console.log('ALREADY A MEMEBER')
      setupUser({
        curUser,
        endPoint: 'login',
        alertText: 'Login Successful'
      })
    } else {
      setupUser({
        curUser,
        endPoint: 'register',
        alertText: 'User Created'
      })
    }
    //console.log("this is the current values", values);
  }

  const toggleMember = () => {
    setValues( {...values, isMember: !values.isMember});
  }

  useEffect( () => {
    //console.log('this is user', user)
    if (user) {
      setTimeout( () => {
        navigate('/overview')
      }, 1000)
    }
  })

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={submitHandler}>
      <img src={logo} alt='logo' className='logo' />
      <h3>{values.isMember ? 'Login To GetHired' : 'Sign Up Today'}</h3>
      {showAlert && <div className={`alert alert-${alertType}`}>{alertText} </div>}

      <div className='form-row'>

        {!values.isMember && <><label htmlFor='name' className='form-label'>Name</label>
        <input type='text' value={values.name} name='name' onChange={changeHandler} className='form-input'/></>}
        <label htmlFor='email' className='form-label'>Email</label>
        <input type='email' value={values.email} name='email' onChange={changeHandler} className='form-input'/>
       <label htmlFor='password' className='form-label'>Password</label>
        <input type='password' value={values.password} name='password' onChange={changeHandler} className='form-input'/>
      </div>

      <button type='submit' className='btn btn-block' >{values.isMember?'Sign In':'Sign Up'}</button>
      <Link to='/' className='btn btn-block'>Cancel</Link>

      <p>
        {values.isMember ? 'Not a member yet?' : 'Already a member?'}
        <button type='button' onClick={toggleMember} className='member-btn' >{values.isMember ? 'Sign Up' : 'Login'}</button>
      </p>
      </form>
    </Wrapper>
  )
}

export default Auth;
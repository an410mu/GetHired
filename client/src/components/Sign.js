import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAppContext} from '../context/appContext';
import logo from '../assets/logo.png';
import Wrapper from '../styles/sign.js';
import ReactDOM from 'react-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

const modalStyle = {
  position: "fixed",
  top: "15%",
  left: "30%",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  width: "40vw"
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom:0,
  backgroundColor: "rgba(96,96,96,.8)",
  zIndex: 1000
}

const Sign = (props) => {
  const [values, setValues] = useState(initialState);

  //const state = useAppContext();
  //console.log(state);
  const { showAlert, alertText, alertType, displayAlert} = useAppContext();

  const changeHandler = (e) => {
    //console.log(e.target.name,e.target.value);
    setValues({...values, [e.target.name] : e.target.value})
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submited")
    const {name, email, password, isMember} = values;
    if (!email || !password || !name ) {
      displayAlert();
      //return;
    }
    console.log("this is the current values", values);
    setValues({
      ...values,
      name:'',
      email:'',
      password:''
    })
  }


  return ReactDOM.createPortal(
    <>
    <Wrapper style={overlayStyle}>
      <form style={modalStyle}  onSubmit={submitHandler}>
      <img src={logo} alt='logo' className='logo' />
      <h3>Sign Up Today</h3>
      {showAlert && <div className={`alert alert-${alertType}`}>{alertText} </div>}

      <div className='form-row'>

        <label htmlFor='name' className='form-label'>Name</label>
        <input type='text' value={values.name} name='name' onChange={changeHandler} className='form-input'/>
        <label htmlFor='email' className='form-label'>Email</label>
        <input type='email' value={values.email} name='email' onChange={changeHandler} className='form-input'/>
       <label htmlFor='password' className='form-label'>Password</label>
        <input type='password' value={values.password} name='password' onChange={changeHandler} className='form-input'/>
      </div>

      <button type='submit' className='btn btn-block' >Sign Up</button>
      <button className='btn btn-block' onClick={() =>props.handleSignUp(false)}>Cancel</button>
      </form>
    </Wrapper>
    </>,document.getElementById("s-portal")
  )
}

export default Sign;
import React, {useReducer, useContext} from 'react';
import axios from 'axios';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user:user ? JSON.parse(user) : null,
  token:token,
  showSidebar: true,
}


//actions
const display_alert = 'SHOW_ALERT';
const clear_alert = 'CLEAR_ALERT';
const register = 'REGISTER_BEGIN';
const done = 'REGISTER_DONE';
const setup_begin = 'SETUP_USER_BEGIN';
const setup_success = 'SETUP_USER_SUCCESS';
const setup_error = 'SETUP_ERROR';
const toggle_sidebar = 'TOGGLE_SIDEBAR';
const logout = 'LOGOUT';


//reduer hooks
const reducer = (state, action) => {
  if (action.type === display_alert) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!'
    }
  }
  if (action.type === clear_alert) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }
  if (action.type === register) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (action.type === done) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: 'User Created!....',
      alertType: 'success',
      user:action.playload.user,
      token:action.playload.token
    }
  }

  if (action.type === setup_begin) {
    return {...state, isLoading:true}
  }

  if (action.type === setup_success) {
    return {
      ...state,
      isLoading:true,
      token:action.playload.token,
      user:action.playload.user,
      showAlert:true,
      alertType: 'success',
      alertText:action.playload.alertText
    }
  }

    if (action.type === setup_error) {
      return {
        ...state,
        isLoading: false,
        showAlert:true,
        alertType: 'danger',
        alertText: action.playload.msg
      }
    }

    if (action.type === toggle_sidebar) {
      return {
        ...state,
        showSidebar: !state.showSidebar,
      }
    }

    if (action.type === logout) {
      return {
        ...initialState,
        user: null,
        token: null,
      }
    }

  //add action above
  throw new Error(`no such action ${action.type}`)
}

const AppContext = React.createContext();


const useAppContext = () => {
  return useContext(AppContext);
}

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch( {type: display_alert})
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout( () => {dispatch({type:clear_alert})}, 2000);
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    console.log('add to local storage')
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const setupUser = async ({curUser, endPoint, alertText}) => {
    dispatch({type: setup_begin})
    try {
      const { data } = await axios.post(`/api/auth/${endPoint}`, curUser);
      const {user, token} = data;
      dispatch({type:setup_success, playload:{user, token, alertText}})
      //add user to local storage, after refresh still maintain user data
      addUserToLocalStorage({user, token})
    } catch (error) {
      dispatch({type:setup_error, playload:{msg:error.response.data.msg}})
    }

    clearAlert()
  }

  const toggleSidebar = () => {
    dispatch({type: toggle_sidebar})
  }

  const logoutUser = () => {
    dispatch({ type: logout })
    removeUserFromLocalStorage()
  }


  return (
    <AppContext.Provider value={{...state, displayAlert, setupUser, toggleSidebar, logoutUser}}>{children}</AppContext.Provider>
  )
}

export {useAppContext, AppProvider, initialState}

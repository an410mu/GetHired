import React, {useReducer, useContext} from 'react';
import axios from 'axios';


const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user:null,
  token:null,
}


//actions
const display_alert = 'SHOW_ALERT';
const clear_alert = 'CLEAR_ALERT';
const register = 'REGISTER_BEGIN';
const done = 'REGISTER_DONE';


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

  const registerUser = async (curUser) => {
    dispatch({type:register})
    try {
      const response = await axios.post('/api/auth/register', curUser)
      console.log(response)
      const {user, token} = response.data;
      dispatch({
        type:done,
        playload:{user, token}
      })
    } catch (error) {

    }
  }

  return (
    <AppContext.Provider value={{...state, displayAlert, registerUser}}>{children}</AppContext.Provider>
  )
}

export {useAppContext, AppProvider, initialState}

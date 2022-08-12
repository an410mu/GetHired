import React, {useReducer, useContext} from 'react';


const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: ''
}


//actions
const display_alert = 'SHOW_ALERT';
const clear_alert = 'CLEAR_ALERT'


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

  return (
    <AppContext.Provider value={{...state, displayAlert}}>{children}</AppContext.Provider>
  )
}

export {useAppContext, AppProvider, initialState}

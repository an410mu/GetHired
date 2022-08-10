import {useState, useReducer, useContext} from 'react';
import React from 'react';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: ''
}

const AppContext = React.createContext();

const useAppContext = () => {
  return useContext(AppContext);
}

const AppProvider = ({children}) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={{...state}}>{children}</AppContext.Provider>
  )
}

export {useAppContext, AppProvider, initialState}

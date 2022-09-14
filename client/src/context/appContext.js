import React, {useReducer, useContext, useEffect} from 'react';
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
  //jobs states
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  description : '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  //for jobs
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
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
const handleInput = 'HANDLE_INPUT';
const clear = 'CLEAR';
const createJob = 'CREATE_JOB';
const createJobSuccess = 'CREATE_JOB_SUCCESS';
const getJob = 'GET_JOB';
const getJobSuccess = 'GET_JOB_SUCCESS';
const edit = 'EDIT_JOB'


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

    if (action.type === handleInput) {
      return {
        ...state,
        [action.playload.name]: action.playload.value,
      }
    }
    if (action.type === clear) {
      const initialState = {
        isEditing: false,
        editJobId: '',
        position: '',
        company: '',
        jobLocation: '',
        description:'',
        jobType: 'full-time',
        status: 'pending',
      }

      return {
        ...state,
        ...initialState,
      }
    }

    if (action.type === createJob) {
      return { ...state, isLoading: true }
    }

    if (action.type === createJobSuccess) {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'New Job Created!',
      }
    }

    if (action.type === getJob) {
      return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === getJobSuccess) {
      return {
        ...state,
        isLoading: false,
        jobs: action.playload.jobs,
        totalJobs: action.playload.totalJobs,
        numOfPages: action.playload.numOfPages,
      }
    }

    if (action.type === edit) {
      const job = state.jobs.find((job) => job._id === action.playload.id)
      const { _id, position, company, jobLocation, jobType, status, description} = job
      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        description,
        company,
        jobLocation,
        jobType,
        status,
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

  const handleChange = ({ name, value }) => {
    dispatch({ type: handleInput, playload: { name, value } })
  }
  const clearValues = () => {
    dispatch({ type: clear })
  }

  const createJobs = async () => {
    dispatch({ type: createJob })
    const config = {
      headers: { Authorization: `Bearer ${token}` }};
    const { position, company, jobLocation, description, jobType, status } = state
    await axios.post('/api/jobs', {
      position,
      company,
      jobLocation,
      description,
      jobType,
      status,
    }, config)
    dispatch({ type: createJobSuccess })
    dispatch({ type: clear })

    clearAlert()
  }

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state

    //let url = `/jobs`
    const config = {
      headers: { Authorization: `Bearer ${token}` }};

    dispatch({ type: getJob })
    try {
      const { data } = await axios.get('/api/jobs', config)
      const { jobs, totalJobs, numOfPages } = data
      dispatch({
        type: getJobSuccess,
        playload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      })
    } catch (error) {
      //logoutUser()
    }
    clearAlert()
  }

  const setEdit = id => {
    dispatch({type:edit, playload:{id}})
  }

  const editJob = () => {
    console.log("edit job")
  }

  const deleteJob = (id) => {
    console.log("delete job", id)
  }

  useEffect(() => {
    getJobs()
  }, [jobs])

  return (
    <AppContext.Provider value={{...state, displayAlert, setupUser, toggleSidebar, logoutUser, handleChange, clearValues, createJobs, getJobs,editJob,deleteJob,setEdit }}>{children}</AppContext.Provider>
  )
}

export {useAppContext, AppProvider, initialState}

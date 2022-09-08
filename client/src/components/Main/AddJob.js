import React from 'react';
import {useAppContext} from '../../context/appContext';
import Wrapper from '../../styles/addform';

const AddJob = () => {
  const {
    isLoading,isEditing,
    showAlert,displayAlert,alertText,alertType,
    position,
    company,
    description,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues
  } = useAppContext();


  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation || !description) {
      displayAlert()
      return
    }
    if (isEditing) {
      editJob()
      return
    }
    //createJob()
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {/* show alert like the auth page */}
        {showAlert && <div className={`alert alert-${alertType}`}>{alertText}</div>}
        <div className='form-row'>
          <label htmlFor='company' className='form-label'>Company</label>
          <input type='text' value={company} name='company' onChange={changeHandler} className='form-input'/>
          <label htmlFor='position' className='form-label'>position</label>
          <input type='text' value={position} name='position' onChange={changeHandler} className='form-input'/>
          <label htmlFor='jobLocation' className='form-label'>jobLocation</label>
          <input type='text' value={jobLocation} name='jobLocation' onChange={changeHandler} className='form-input'/>
          <label htmlFor='description' className='form-label'>description</label>
          <input type='text' value={description} name='description' onChange={changeHandler} className='form-input'/>

        </div>
        <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block submit-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
      </form>
    </Wrapper>

  )
}

export default AddJob;
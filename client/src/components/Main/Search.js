import React from 'react';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../styles/search'

const Search = () => {
  const {
    //search,
    isLoading,
    changeHandler
  } = useAppContext()

  const handleSearch = (e) => {
    if (isLoading) return
    changeHandler({ name: e.target.name, value: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    //clearFilters()
  }
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}

          <label htmlFor='search' name='search'>search</label>
          <input className='form-input' type='text'  name='search' onChange={handleSearch}></input>

          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >

          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Search

import React, {useEffect} from 'react';
import Search from './Search.js';
import Job from './Job.js';
import Wrapper from '../../styles/alljobs'
import { useAppContext } from '../../context/appContext';

const AllJobs = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
  } = useAppContext()
  useEffect(() => {
    getJobs()
    // eslint-disable-next-line
  }, [])

    if (jobs.length === 0 ) {
      return (
        <>
          <Search />
          <h2>No jobs to display</h2>
        </>
      )
    } else {
        return (
          <Wrapper>
            <div>AllJobs</div>
            <Search />
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className='jobs'>
              {jobs.map( job => {
                return <Job key={job._id} {...job}/>
              })}
            </div>
          </Wrapper>
        )
    }
}


export default AllJobs;
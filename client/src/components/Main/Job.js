import moment from 'moment';
import React from 'react';
import styled from 'styled-components'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../styles/jobCard';


const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {

  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <IconWrapper>
            <span className='icon'>{<FaLocationArrow />}</span>
            <span className='icon'>{jobLocation}</span>
          </IconWrapper>
          <IconWrapper>
            <span className='icon'>{<FaCalendarAlt />}</span>
            <span className='icon'>{date}</span>
          </IconWrapper>
          <IconWrapper>
            <span className='icon'>{<FaBriefcase />}</span>
            <span className='icon'>{jobType}</span>
          </IconWrapper>
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
    }

export default Job


const IconWrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
`
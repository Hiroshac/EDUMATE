import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'

export const ProfileCard = (props) => {
  const { user } = useContext(AuthContext)
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='d-flex flex-column align-items-center text-center'>
          <img
            src='https://bootdey.com/img/Content/avatar/avatar7.png'
            alt='Admin'
            className='rounded-circle'
            width='150'
          />
          <div className='mt-3'>
            <h4>
              {user.firstName} {user.lastName}
            </h4>
            <h6>{user.stream}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

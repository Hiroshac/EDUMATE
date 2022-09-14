import React from 'react'

export const ProfileCard = () => {
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
            <h4>John Doe</h4>
            <p className='text-secondary mb-1'>Full Stack Developer</p>
            <button className='btn btn-outline-primary'>Message</button>
          </div>
        </div>
      </div>
    </div>
  )
}
import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../Navbar'
import './profile.css'
import { ProfileCard } from './ProfileCard'

function Profile() {
  return (
    <div className='container'>
      <div className='mb-3 '>
        <Navbar />
      </div>

      <div className='main-body my-5'>
        <div className='row gutters-sm mt-5'>
          <div className='col-md-4 mb-3'>
            <ProfileCard />
          </div>

          <div className='col-md-8'>
            <div className='card mb-3'>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-sm-3'>
                    <h6 className='mb-0'>Full Name</h6>
                  </div>
                  <div className='col-sm-9 text-secondary'>Kenneth Valdez</div>
                </div>
                <hr />
                <div className='row'>
                  <div className='col-sm-3'>
                    <h6 className='mb-0'>Email</h6>
                  </div>
                  <div className='col-sm-9 text-secondary'>fip@jukmuh.al</div>
                </div>
                <hr />
                <div className='row'>
                  <div className='col-sm-3'>
                    <h6 className='mb-0'>Phone</h6>
                  </div>
                  <div className='col-sm-9 text-secondary'>(239) 816-9029</div>
                </div>
                <hr />
                <div className='row'>
                  <div className='col-sm-3'>
                    <h6 className='mb-0'>Mobile</h6>
                  </div>
                  <div className='col-sm-9 text-secondary'>(320) 380-4539</div>
                </div>
                <hr />
                <div className='row'>
                  <div className='col-sm-3'>
                    <h6 className='mb-0'>Address</h6>
                  </div>
                  <div className='col-sm-9 text-secondary'>
                    Bay Area, San Francisco, CA
                  </div>
                </div>
                <hr />
                <div className='row'>
                  <div className='col-sm-12'>
                    <Link to='/updateProfile' className='btn btn-primary'>
                      Update
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProfileCard } from './ProfileCard'
import Swal from 'sweetalert2'
import Navigation from '../Navigation/Navigation'

function ForgetPwd() {
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [reNewPwd, setReNewPwd] = useState('')
  const params = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      oldPassword: oldPwd,
      newPassword: newPwd,
    }

    if (newPwd !== reNewPwd) {
      Swal.fire({
        icon: 'warning',
        title: 'oops...',
        text: 'Password Mismatch!!!',
      })
    } else {
      await axios
        .put(`/api/auth/updatePwd/${params.id}`, data)
        .then((res) => {
          console.log(res)
          if (res.data === 'Password Reset') {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Password Successfully Updated',
              showConfirmButton: false,
              timer: 1500,
            })
            navigate('/login')
          } else if (res.data.message === 'Wrong Password') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Old password is incorrect !!!',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something is Wrong !!!',
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div>
      <Navigation />
      <div className='container'>
        <div className='main-body my-5'>
          <div className='row gutters-sm mt-5'>
            <div className='my-2' style={{ marginLeft: '30%', width: '40%' }}>
              <ProfileCard />
            </div>

            <div className='card'>
              <div className='card-body'>
                <form onSubmit={handleSubmit}>
                  <div className='row mb-3'>
                    <div className='col-sm-3'>
                      <h6 className='mb-0'>Old Password</h6>
                    </div>
                    <div class='col-sm-9 text-seconday'>
                      <input
                        type='password'
                        className='form-control'
                        value={oldPwd}
                        onChange={(e) => setOldPwd(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-sm-3'>
                      <h6 className='mb-0'>New Password</h6>
                    </div>
                    <div className='col-sm-9 text-secondary'>
                      <input
                        type='password'
                        className='form-control'
                        pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                        title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-sm-3'>
                      <h6 className='mb-0'>Re-enter New Password</h6>
                    </div>
                    <div className='col-sm-9 text-secondary'>
                      <input
                        type='password'
                        className='form-control'
                        value={reNewPwd}
                        onChange={(e) => setReNewPwd(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='row '>
                    <div className='col-sm-4'></div>
                    <div className='col-sm-8 text-secondary d-flex justify-content-end'>
                      <button
                        type='submit'
                        className='btn btn-primary'
                        // onClick={handleSubmit}
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPwd

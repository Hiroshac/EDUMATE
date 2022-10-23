import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function ForgetPassword() {
  const [password, setPassword] = useState('')
  const [rpassword, setRpassword] = useState('')
  const id = localStorage.getItem('userId')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      id: id,
      newPassword: password,
    }
    if (password === '' || rpassword === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please enter the Password in Both Fields!!!',
      })
    } else {
      if (password !== rpassword) {
        Swal.fire({
          icon: 'warning',
          title: 'oops...',
          text: 'Password Mismatch!!!',
        })
      } else {
        await axios
          .put(`http://localhost:5000/api/auth/forgetPassword`, data)
          .then((res) => {
            if (res.data === 'Password Updated') {
              localStorage.removeItem('userId')
              Swal.fire('Success', 'Password Successfully Updated', 'success')
              navigate('/login')
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
  }

  return (
    <div className='Container'>
      <section className='vh-100'>
        <div className='container-fluid h-custom'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-md-9 col-lg-6 col-xl-5'>
              <img
                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
                className='img-fluid'
                alt='Sample image'
              />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1 px-3'>
              <h1 className='text-center pt-5 pb-3'>
                <b>Froget Password</b>
              </h1>
              <form onSubmit={handleSubmit}>
                <h3>Update Password</h3>
                <div className='form-outline mb-4 pt-2'>
                  <label className='form-label' for='form3Example3'>
                    New Password
                  </label>
                  <input
                    type='password'
                    id='email'
                    className='form-control form-control-lg'
                    placeholder='Enter new password'
                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                    title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                    required
                  />
                </div>
                <div className='form-outline mb-3'>
                  <label className='form-label' for='form3Example4'>
                    Re-enter Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    className='form-control form-control-lg'
                    placeholder='Re-enter password'
                    value={rpassword}
                    onChange={(e) => setRpassword(e.target.value)}
                    required
                  />
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    // onClick={handleSubmit}
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForgetPassword

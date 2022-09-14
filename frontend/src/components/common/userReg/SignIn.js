import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'

function SignIn() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  })
  const { loading, error, dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      await axios
        .post('http://localhost:5000/api/auth/login', credentials)
        .then((res) => {
          if (res.data.isAdmin) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details })
            navigate('/profile')
          } else if (res.data.details.type === 'Student') {
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details })
            navigate('/profile')
          } else if (res.data.details.type === 'Teacher') {
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details })
            navigate('/profile')
          } else {
            dispatch({
              type: 'LOGIN_FAILURE',
              payload: { message: 'You are allowed!' },
            })
          }
        })
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
      alert('Wrong email or password')
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
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
              {error && <span>{error.message}</span>}
              <form onSubmit={handleClick}>
                <h1 className='text-center p-5'>
                  <b>Edumate Login</b>
                </h1>
                <div className='form-outline mb-4'>
                  <input
                    type='email'
                    id='email'
                    className='form-control form-control-lg'
                    placeholder='Enter a valid email address'
                    onChange={handleChange}
                    required
                  />
                  <label className='form-label' for='form3Example3'>
                    Email address
                  </label>
                </div>
                <div className='form-outline mb-3'>
                  <input
                    type='password'
                    id='password'
                    className='form-control form-control-lg'
                    placeholder='Enter password'
                    onChange={handleChange}
                    required
                  />
                  <label className='form-label' for='form3Example4'>
                    Password
                  </label>
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                  <button type='submit' className='btn btn-primary btn-lg'>
                    Login
                  </button>
                  <a href='#!' className='text-body'>
                    Forgot password?
                  </a>
                </div>

                <div className='text-center text-lg-start mt-2 pt-2'>
                  <p className='small fw-bold mt-2 pt-1 mb-0'>
                    Don't have an account?{' '}
                    <Link to='/register' className='link-danger'>
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignIn
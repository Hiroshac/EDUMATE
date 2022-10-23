import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function SignUp() {
  const [firstName, setFname] = useState('')
  const [lastName, setLname] = useState('')
  const [type, setType] = useState('')
  const [stream, setStream] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rpassword, setRpassword] = useState('')
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const loadData = async () => {
    axios
      .get('stream/')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      firstName: firstName,
      lastName: lastName,
      type: type,
      stream: stream,
      email: email,
      password: password,
    }

    if (
      data.firstName == '' ||
      data.lastName == '' ||
      data.stream == '' ||
      data.type == '' ||
      data.email == '' ||
      data.password == ''
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please fill all the details!!!',
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
          .post('http://localhost:5000/api/auth/register', data)
          .then((res) => {
            console.log(res)
            if (res.data === 'Created') {
              Swal.fire('Congrats!', 'Successfully Registered', 'success')
              navigate('/login')
            } else if (res.data === 'Exists') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The User Already Exists !!!',
                showConfirmButton: false,
              })
              window.location.reload()
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
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
              <h3 className='text-center p-3 mt-4'>Register to Edumate</h3>
              <form onSubmit={handleSubmit}>
                <div className='form-outline mb-1'>
                  <label className='form-label' for='form3Example3'>
                    First Name
                  </label>
                  <input
                    type='fname'
                    id='fname'
                    className='form-control form-control-lg'
                    placeholder='First Name'
                    value={firstName}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>
                <div className='form-outline mb-1'>
                  <label className='form-label' for='form3Example3'>
                    Last Name
                  </label>
                  <input
                    type='lname'
                    id='lname'
                    className='form-control form-control-lg'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </div>
                <div className='form-outline mb-1'>
                  <label className='form-label' for='form3Example3'>
                    Type
                  </label>
                  <select
                    id='type'
                    name='type'
                    className='form-control form-control-lg'
                    placeholder='Choose'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option>--Choose--</option>
                    <option value='Student'>Student</option>
                    <option value='Teacher'>Teacher</option>
                  </select>
                </div>
                <div className='form-outline mb-1'>
                  <label className='form-label' for='form3Example3'>
                    Stream
                  </label>
                  <select
                    id='stream'
                    name='stream'
                    className='form-control form-control-lg'
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}
                    required
                  >
                    <option>--Choose--</option>
                    {data.map((stream) => {
                      return (
                        <option key={stream._id} value={stream.streamname}>
                          {stream.streamname}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className='form-outline mb-1'>
                  <label className='form-label' for='form3Example3'>
                    Email address
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='form-control form-control-lg'
                    placeholder='Enter a valid email address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='form-outline mb-1'>
                  <label className='form-label' for='form3Example4'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                    title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                    className='form-control form-control-lg'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='form-outline mb-3'>
                  <label className='form-label' for='form3Example4'>
                    Re-enter Password
                  </label>
                  <input
                    type='password'
                    id='rpassword'
                    className='form-control form-control-lg'
                    placeholder='Re-enter password'
                    value={rpassword}
                    onChange={(e) => setRpassword(e.target.value)}
                    required
                  />
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                  <div className='form-check mb-0'>
                    <button
                      type='submit'
                      className='btn btn-primary btn-lg'
                      // onClick={handleSubmit}
                    >
                      Register
                    </button>
                  </div>
                  <p className='small fw-bold mb-0'>
                    Have an account?{' '}
                    <Link to='/login' className='link-danger'>
                      Login
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

export default SignUp

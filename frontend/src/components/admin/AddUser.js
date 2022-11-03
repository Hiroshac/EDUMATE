import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import AdminNav from '../common/Navigation/AdminNav'

function AddUser() {
  const [firstName, setFname] = useState('')
  const [lastName, setLname] = useState('')
  const [type, setType] = useState('')
  const [stream, setStream] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rpassword, setRpassword] = useState('')
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

  const handleSubmit = async () => {
    const obj = {
      firstName: firstName,
      lastName: lastName,
      type: type,
      stream: stream,
      email: email,
      password: password,
    }
    //checking the fields are empty
    if (
      obj.firstName == '' ||
      obj.lastName == '' ||
      obj.stream == '' ||
      obj.type == '' ||
      obj.email == '' ||
      obj.password == ''
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please fill all the details!!!',
      })
    } else {
      //validating the password
      if (password !== rpassword) {
        Swal.fire({
          icon: 'warning',
          title: 'oops...',
          text: 'Password Mismatch!!!',
        })
      } else {
        await axios
          .post('http://localhost:5000/api/auth/register', obj)
          .then((res) => {
            if (res.data === 'Created') {
              // Swal.fire('Successful!!!', 'Successfully Added', 'success')
              Swal.fire({
                icon: 'success',
                title: 'Successful!!!',
                text: 'Successfully Added',
                showConfirmButton: false,
              })
              window.location.reload()
            } else if (res.data === 'Exists') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The User Already Exists !!!',
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
    <div>
      <AdminNav />
      {/* <div className='d-flex justify-content-center pt-3'>
        <h1>User Details</h1>
      </div> */}
      <div className='container'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-12 '>
            <h3 className='text-center p-3 mt-4'>Add User</h3>
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
                {/* <option value='Admin'>Admin</option>
                <option value='SuperAdmin'>Super Admin</option> */}
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
                {data.map((streams) => {
                  return (
                    <option key={streams._id} value={streams.streamname}>
                      {streams.streamname}
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
                  onClick={handleSubmit}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUser

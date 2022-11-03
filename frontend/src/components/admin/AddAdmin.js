import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import AdminNav from '../common/Navigation/AdminNav'

function AddAdmin() {
  const [firstName, setFname] = useState('')
  const [lastName, setLname] = useState('')
  const [type, setType] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rpassword, setRpassword] = useState('')

  const handleSubmit = async () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
      type: type,
      email: email,
      password: password,
      isAdmin: true,
    }
    if (
      data.firstName == '' ||
      data.lastName == '' ||
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
            if (res.data === 'Created') {
              // Swal.fire('Congrats!', 'Successfully Added', 'success')
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
                text: 'The Email already Registered !!!',
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
      <div className='container'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-12 my-3'>
            <h3 className='text-center p-3 mt-4'>Add Admin</h3>
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
                <option value='Admin'>Admin</option>
                <option value='sAdmin'>Super Admin</option>
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
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAdmin

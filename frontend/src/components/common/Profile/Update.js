import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from '../Navbar'
import { ProfileCard } from './ProfileCard'

function Update() {
  const [id, setId] = useState()
  const [firstName, setFname] = useState()
  const [lastName, setLname] = useState()
  const [type, setType] = useState()
  const [stream, setStream] = useState()
  const [dob, setDob] = useState()
  const [data, setData] = useState([])

  const params = useParams()

  useEffect(() => {
    axios
      .get(`/api/users/${params.id}`)
      .then((res) => {
        setFname(res.data.firstName)
        setLname(res.data.lastName)
        setType(res.data.type)
        setStream(res.data.stream)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  const loadData = async () => {
    axios
      .get('/stream/')
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

  const handlesubmit = () => {
    const obj = {}

    axios.put(`api/users/${id}`)
  }

  return (
    <div className='container'>
      <div className='mb-3'>
        <Navbar />
      </div>

      <div className='main-body my-5'>
        <div className='row gutters-sm mt-5'>
          <div className='my-2' style={{ marginLeft: '30%', width: '40%' }}>
            <ProfileCard />
          </div>

          <div className='card'>
            <div className='card-body'>
              <div className='row mb-3'>
                <div className='col-sm-3'>
                  <h6 className='mb-0'>First Name</h6>
                </div>
                <div class='col-sm-9 text-seconday'>
                  <input
                    type='text'
                    className='form-control'
                    value={firstName}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-3'>
                  <h6 className='mb-0'>Last Name</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <input
                    type='text'
                    className='form-control'
                    value={lastName}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-3'>
                  <h6 className='mb-0'>Date Of Birth</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  {/* <DatePicker
                    type='text'
                    className='form-control'
                    value={dob}
                    onClick={(e) => setDob(e.target.value)}
                  /> */}
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-3'>
                  <h6 className='mb-0'>Role</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <input
                    type='text'
                    className='form-control'
                    value='it20255824@my.sliit.lk'
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-3'>
                  <h6 className='mb-0'>Stream</h6>
                </div>
                <div className='col-sm-9 text-secondary'>
                  <select
                    id='stream'
                    name='stream'
                    className='form-control'
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}
                    required
                  >
                    {data.map((stream) => {
                      return (
                        <option key={stream._id} value={stream.streamname}>
                          {stream.streamname}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
              <div className='row '>
                <div className='col-sm-4'></div>
                <div className='col-sm-8 text-secondary'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    onClick={handlesubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update

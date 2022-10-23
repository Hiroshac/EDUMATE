import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Navigation from '../../common/Navigation/Navigation'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import Swal from 'sweetalert2'

export const UploadLink = () => {
  const navigate = useNavigate()
  const hr = {
    borderLeft: '6px solid green',
    height: '400px',
  }

  const [subject, setSubject] = useState([])
  const [selectedSubject,setSelectedSubject]=useState()
  const [lesson_name, setLesson] = useState()
  const [grade, setGrade] = useState()
  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [link, setLink] = useState()
  const [stream, setStream] = useState([])
  const [selectedStream, setSelectedStream] = useState()

  const validateDate = new Date()
  let day = validateDate.getDate()
  let month = validateDate.getMonth() + 1
  let year = validateDate.getFullYear()

  let currentDate = `${year}-${month}-${day}`

  const { user } = useContext(AuthContext)
  const userId = user._id
  const userStream=user.stream

  const loadStream = () => {

    
      axios.get('stream/').then((res) => {
        setStream(res.data)
      })
    
  }

  const loadSubject = () => {
    axios.post("/subject/stream", { streamname: userStream}).then((res) => {
      setSubject(res.data);
      console.log(res.data)
    })
  }

  useEffect(() => {
    loadStream()
    loadSubject()
  }, [])

  const add = {
    stream:selectedStream,
    subject:selectedSubject,
    lesson_name,
    grade,
    date,
    time,
    link,
    teacher_id: userId,
  }

  console.log(add)

  const upload = (e) => {
    e.preventDefault()
    if (date < currentDate) {
      Swal.fire({
        icon: 'warning',

        title: 'Warning',

        text: 'Please Enter a Valid date!!!',
      })
    } else {
      axios.post('link/add', add)
      Swal.fire({
        icon: 'success',
        title: 'Link added',
      })
      navigate('/viewlink')

      //  $(document).ready(function() {
      //    $('#upload').click(function() {
      //      $('#succ').fadeIn()
      //    })
      //  })
    }
  }

  return (
    <div>
      <Navigation />
      <div className='container mt-5'>
        <div className='mt-5 pt-4'>
          <form onSubmit={upload}>
            <div className='d-flex justify-content-center mt-5 mx-5 border-0 bg-light shadow rounded-2 py=5'>
              <div className='mx-2 mt-5'>
                &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                &nbsp; &nbsp;&nbsp;
                <h1 className='mr-5'>Upload link</h1>
                <br />
                <br />
                <input
                  type='text'
                  style={{ width: '385px' }}
                  class='form-control mb-5 mt-5'
                  id='link'
                  name='link'
                  placeholder='                         place the link'
                  required
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value)
                  }}
                />
                <button
                  type='submit'
                  style={{ width: '300px', height: '50px' }}
                  id='upload'
                  class='btn btn-secondary btn-lg  mx-5 mt-5 '
                >
                  Upload
                </button>
              </div>
              <div className='mx-5 my-4' style={hr} />
              <div className='mx-5 mt-5 pb-4'>
                <form>
                  {/* <select
                    id='stream'
                    name='stream'
                    className='form-control'
                    value={selectedStream}
                    onChange={(e) => setSelectedStream(e.target.value)}
                    required
                  >
                    <option>Stream</option>
                    {stream.map((stream) => {
                      return (
                        <option key={stream._id} value={stream.streamname}>
                          {stream.streamname}
                        </option>
                      )
                    })}
                  </select> */}
                  <input
                    type='text'
                    class='form-control'
                    required
                    id='formGroupExampleInput'
                    disabled
                    value={userStream}
                    onChange={(e) => {
                      setSelectedStream(e.target.value)
                    }}
                  />
                  <br />

                  <select
                    id='stream'
                    name='stream'
                    className='form-control'
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    required
                  >
                    <option>Subject</option>
                    {subject.map((subject) => {
                      return (
                        <option key={subject._id} value={subject.subjectname}>
                          {subject.subjectname}
                        </option>
                      )
                    })}
                  </select>
                  <br />

                  <div className='form-group'>
                    <input
                      type='text'
                      class='form-control'
                      required
                      id='formGroupExampleInput'
                      placeholder='Lesson name'
                      value={lesson_name}
                      onChange={(e) => {
                        setLesson(e.target.value)
                      }}
                    />
                  </div>
                  <br />

                  <div className='form-group'>
                    <select
                      type='number'
                      class='form-control'
                      required
                      id='formGroupExampleInput2'
                      placeholder='Grade'
                      value={grade}
                      onChange={(e) => {
                        setGrade(e.target.value)
                      }}
                    >
                      <option>Grade</option>
                      <option value={12}>12</option>
                      <option value={13}>13</option>
                    </select>
                  </div>
                  <br />

                  <div className='form-group'>
                    <input
                      type='date'
                      class='form-control'
                      required
                      id='formGroupExampleInput2'
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value)
                      }}
                    />
                  </div>
                  <br />

                  <div className='form-group'>
                    <input
                      type='time'
                      class='form-control'
                      required
                      id='formGroupExampleInput2'
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value)
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

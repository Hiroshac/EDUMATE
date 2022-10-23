import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Navigation from '../../common/Navigation/Navigation'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UploadNote = () => {
  const [subject, setSubject] = useState([])
  const [selectedSubject,setSelectedSubject]=useState()
  const [lesson_name, setLesson] = useState()
  const [grade, setGrade] = useState()
  const [file, setFile] = useState([])
  const [stream, setStream] = useState([])
  const [selectedStream, setSelectedStream] = useState()

  const { user } = useContext(AuthContext)
  const userId = user._id
  const userstream = user.stream;

  const navigate = useNavigate()

  const hr = {
    borderLeft: '6px solid green',
    height: '300px',
  }

  const loadStream = () => {
    axios.get('stream/').then((res) => {
      setStream(res.data) 
    })
  }

  const loadSubject = () => {
    axios.post("/subject/stream", { streamname:userstream}).then((res) => {
      setSubject(res.data);
      console.log(res.data)
    })
  }
  useEffect(() => {
    loadStream()
    loadSubject()
  }, [])
  const noteAdd = (e) => {
    setFile(e.target.files[0])
  }

  const Submit = (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('lesson_name', lesson_name)
    formData.append('file', file)
    formData.append('stream',selectedStream)
    formData.append('subject', selectedSubject)
    formData.append('grade', grade)
    formData.append('teacher_id', userId)

    axios.post('/teacherNote/add', formData).then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Note added',
      })
      navigate('/viewNote')
    })
  }

  return (
    <div>
      <Navigation />

      <div className='container mt-5'>
        <div className='mt-5 pt-4'>
          <form onSubmit={Submit}>
            <div className='d-flex justify-content-center mt-5 mx-5 border-0 bg-light shadow rounded-2'>
              <div className='mx-5 mt-5'>
                &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                &nbsp; &nbsp;&nbsp;
                <h1 className='mr-5'>Upload file</h1>
                <br />
                <br />
                <input
                  type='file'
                  style={{ width: '385px' }}
                  multiple
                  filename='file'
                  onChange={noteAdd}
                  className='form-input'
                  required
                />
                <br />
                <br />
                <br />
                <button
                  type='submit'
                  style={{ width: '300px', height: '50px' }}
                  id='upload'
                  class='btn btn-secondary btn-lg'
                >
                  Upload
                </button>
              </div>
              <div className='mx-5 my-4' style={hr} />
              <div className='mx-5 mt-5'>
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
                    value={userstream}
                    onChange={(e) => {
                      setSelectedStream(e.target.value)
                    }}
                  />
                  <br />

                  <select
                    id='subject'
                    name='subject'
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
                      id='formGroupExampleInput'
                      required
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
                </form>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

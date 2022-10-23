import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Navbar } from '../Navbar'
import Navigation from '../../../common/Navigation/Navigation'
import { useParams } from 'react-router-dom'

export const FeedBack = () => {
  const params = useParams()
  const sub = params.name
  console.log(sub)

  const [subjectname, setSubjectname] = useState('')
  const [Comment, setComment] = useState('')
  const [subject, setSubject] = useState([])

  const FeedBack = {
    sub,
    Comment,
  }

  async function SweatAlert(text, item) {
    // await sleep(1000)
    Swal.fire({
      icon: item,
      text: text,
    })
  }

  const AddFeedback = async (e) => {
    e.preventDefault()
    if (Comment == '') {
      SweatAlert('Please fill the required fields.', 'warning')
    } else {
      axios.post('/subjectfeedback/add', FeedBack)
      SweatAlert('Successfully insereted', 'success');
			window.location.reload();

    }
  }

  const loadData = () => {
    axios.get('/subject').then((response) => {
      setSubject(response.data)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Navigation />
      <div
        className=''
        style={{ marginLeft: '30%', marginRight: '30%', marginTop: '10%' }}
      >
        <div className='border shadow rounded-3 bg-light'>
          <form className='mx-5 mt-5 mb-5' onSubmit={AddFeedback}>
            <h2 className='text-center mb-4'>Feed Back</h2>
            <div class='form-group'>
              <label for='exampleInputPassword1'>Subject</label>
              <input type='text' class='form-control' value={sub} disabled />
            </div>
            <div class='form-group'>
              <label for='exampleInputPassword1'>Comment</label>
              <input
                type='text'
                class='form-control'
                value={Comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <div align='center'>
              <button type='submit' class='btn btn-primary mt-5 '>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

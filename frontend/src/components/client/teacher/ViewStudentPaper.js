import React, { useState, useEffect,useContext } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Navigation from '../../common/Navigation/Navigation'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload'


import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export const ViewStudentPaper = () => {
  const bull = (
    <Box
      component='span'
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  )

  const [note, setNote] = useState([])
  const { user } = useContext(AuthContext)
  const stream = user.stream
    console.log(stream)
  const getNotes = () => {
    axios.get(`StudentAnswers/getBySubject/${stream}`).then((res) => {
      setNote(res.data)
      console.log(res.data)
    })
  }

  useEffect(() => {
    getNotes()
  }, [])




  return (
    <div>
      <Navigation />
      <div className='container'>
        <div
          className='container'
          style={{ marginLeft: '0.5%', marginRight: '0.5%', marginTop: '10%' }}
        >
          {note.map((data) => {
            return (
              <>
                 {(data.status == 'None') ? (
                <div className='border shadow rounded-3 bg-light'>
                  <form className='mx-5 mt-5 mb-5'>
                    <Card sx={{ minWidth: 275 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color='text.secondary'
                              gutterBottom
                            >
                              {data.subject}
                            </Typography>
                            <Typography variant='h5' component='div'>
                              {data.lname}
                            </Typography>

                            <Typography variant='body2'>
                              Grade: {data.grade}
                              <br />
                              student Id:{data.student_id}
                            </Typography>
                          </CardContent>
                        </Grid>
                        <Grid item xs={3}>
                          <br />
                          <br />
                          <CardActions>
                            <NavLink to={`/markpapers/${data._id}`}>
                              <Button
                                style={{ width: '115px' ,height:'65px' }}
                                variant='outlined'
                                size='large'
                              >
                                Mark
                              </Button>
                            </NavLink>
                            <form
                              method='get'
                              action={
                                `http://localhost:5000/StudentAnswers/` +
                                data.image
                              }
                            >
                              <div></div>
                              <button className='btn btn-primary'>
                                <SimCardDownloadIcon
                                  style={{ width: '100px' }}
                                />
                                Download
                              </button>
                            </form>
                          </CardActions>
                        </Grid>
                      </Grid>
                    </Card>
                  </form>
                </div>
                ):(
                    <>
                    <p>No Papers to mark</p>
                    </>
                )
                 }
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

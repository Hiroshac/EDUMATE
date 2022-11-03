import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TablePagination from '@mui/material/TablePagination'
import { NavLink } from 'react-router-dom'
import AdminNav from '../common/Navigation/AdminNav.js'
import Swal from 'sweetalert2'

function UserManagement() {
  const [data, setData] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  useEffect(() => {
    // fetchData()
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/api/users?q=${searchItem.toLowerCase()}`)
        .then((res) => {
          setData(res.data)
        })
    }
    if (searchItem.length === 0 || searchItem.length > 1) fetchData()
  }, [searchItem])

  const deleteProfile = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`).then((res) => {
      // Swal.fire('Successful!', 'Successfully Deleted', 'success')
      Swal.fire({
        icon: 'success',
        title: 'Successful',
        text: 'Successfully Deleted',
        showConfirmButton: false,
      })
      window.location.reload()
    })
  }

  //pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <div>
      <AdminNav />

      <div className='container mt-4'>
        <div className='d-flex justify-content-right pb-3'>
          <h2>User Details</h2>
        </div>
        <div className='col-12 col-md-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Search...'
            value={searchItem}
            onChange={(e) => {
              setSearchItem(e.target.value)
            }}
          />
        </div>
        <div className='mt-2'>
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table
                // sx={{ minWidth: 650 }}
                stickyHeader
                aria-label='sticky table'
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className='fw-bold fs-6 m-0'>First Name</p>
                    </TableCell>
                    <TableCell>
                      <p className='fw-bold fs-6 m-0'>Last Name</p>
                    </TableCell>
                    <TableCell>
                      <p className='fw-bold fs-6 m-0'>Role</p>
                    </TableCell>
                    <TableCell>
                      <p className='fw-bold fs-6 m-0'>Stream</p>
                    </TableCell>
                    <TableCell>
                      <p className='fw-bold fs-6 m-0'>Date of Birth</p>
                    </TableCell>
                    <TableCell>
                      <p className='fw-bold fs-6 m-0'>Email</p>
                    </TableCell>
                    <TableCell>
                      <p className='fw-bold fs-6 m-0'>Action</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((fname) =>
                      fname.firstName.toLowerCase().includes(searchItem)
                    )
                    .map((row) => (
                      <TableRow>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.stream}</TableCell>
                        <TableCell>{row.dateOfBirth}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          <NavLink
                            to={`/updateuser/${row._id}`}
                            className='pe-3'
                          >
                            <Button variant='contained'>Update</Button>
                          </NavLink>
                          <Button
                            variant='outlined'
                            onClick={() => {
                              deleteProfile(row._id)
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              className='m-0'
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default UserManagement

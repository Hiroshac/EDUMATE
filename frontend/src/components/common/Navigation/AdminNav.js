import  {React, useContext }from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { AuthContext } from '../../../context/AuthContext'

function AdminNav() {
  const { user } = useContext(AuthContext)
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
         {(user.type == 'sAdmin') ? (
              <Container>
              <Navbar.Brand href='#home'>Edumate</Navbar.Brand>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto'>
                  <Nav.Link href='/admin/home'>Home</Nav.Link>
                  <Nav.Link href='/adduser'>Add User</Nav.Link>
                  <Nav.Link href='/addadmin'>Add Admin</Nav.Link>
                  <NavDropdown title='Details' id='collasible-nav-dropdown'>
                    <NavDropdown.Item href='/viewuser'>User Details</NavDropdown.Item>
                  </NavDropdown>
                </Nav>

                <Nav>
                  <Nav.Link eventKey={2} href='/logout'>
                    <button className='btn btn-outline-danger btn-sm'>Logout</button>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              </Container>
      ) : (
        (user.type == 'Admin' ? (
          <Container>
          <Navbar.Brand href='#home'>Edumate</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/adminhome'>Exam Report</Nav.Link>
              <Nav.Link href='/getsubtime'>Manage Time Tables</Nav.Link>
              <Nav.Link href='/getexam'>Manage Exams</Nav.Link>
              <Nav.Link href='/getsubject'>Manage Subjects</Nav.Link>
              <Nav.Link href='/notereport'>Note Report</Nav.Link>
              <Nav.Link href='/streport'>Student Answer Report</Nav.Link>

              <NavDropdown title='Details' id='collasible-nav-dropdown'>
                <NavDropdown.Item href='/viewuser'>User Details</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href='/logout'>
                <button className='btn btn-outline-danger btn-sm'>Logout</button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        ) : (
          <>
            <p>error</p>
          </>
        ))
      )}
    </Navbar>
  )
}

export default AdminNav



import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { AuthContext } from '../../../context/AuthContext'

function Navigation() {
  const { user } = useContext(AuthContext)
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      {/* teacher container */}
      {(user.type == 'Teacher') ? (
        <Container>
          <Navbar.Brand href='#home'>Edumate</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              {/* <Nav.Link href='/profile'>Home</Nav.Link> */}
              <Nav.Link href='/addnote'>Add Notes</Nav.Link>
              <Nav.Link href='/addlink'>Add Links</Nav.Link>
              <Nav.Link href='/papers'>Paper Marking</Nav.Link>
              <Nav.Link href='/message'>Group Chat</Nav.Link>
              <NavDropdown
                title='Teacher Uploades'
                id='collasible-nav-dropdown'
              >
                <NavDropdown.Item href='/viewnote'>View Notes</NavDropdown.Item>
                <NavDropdown.Item href='/viewlink'>View Links</NavDropdown.Item>
                <NavDropdown.Item href='/viewMark'>
                  Student Marks
                </NavDropdown.Item>
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href='/profile'>Profile</Nav.Link>
              <Nav.Link eventKey={2} href='/logout'>
                <button className='btn btn-outline-danger btn-sm'>
                  Logout
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      ) : (
        (user.type == 'Student' ? (
          // student container
          <Container>
            <Navbar.Brand href='#home'>Edumate</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href='/subjectnote'>Subject</Nav.Link>
                <Nav.Link href='/message'>Group Chat</Nav.Link>
                <NavDropdown title='Time Table' id='collasible-nav-dropdown'>
                  <NavDropdown.Item href='examtimetable'>Exam Time Table</NavDropdown.Item>
                  <NavDropdown.Item href='subjecttimetable'>Subject Time Table</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href='/streport'>Report</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href='/profile'>Profile</Nav.Link>
                <Nav.Link eventKey={2} href='/logout'>
                  <button className='btn btn-outline-danger btn-sm'>
                    Logout
                  </button>
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

export default Navigation

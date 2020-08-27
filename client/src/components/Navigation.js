import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { LinkContainer } from 'react-router-bootstrap'
function Navigation(props) {
  return (
    <Navbar bg="light" className="navigation">
        <div className="container">
            <Navbar.Brand>Classroom</Navbar.Brand>
            {/* <div>
                <FormControl type="text" placeholder="Search"/>
            </div> */}
            <div>
              <LinkContainer to="/login">
                <Button variant="outline-primary" className="authBtns">Login</Button>
              </LinkContainer>
              <LinkContainer to="/register">
                <Button variant="primary" className="authBtns">Sign up</Button>
              </LinkContainer>
            </div>
        </div>
    </Navbar>
  );
}

export default Navigation;

import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
function Navigation() {
  return (
    <Navbar bg="light" className="navigation">
        <div className="container">
            <Navbar.Brand>Classroom</Navbar.Brand>
            {/* <div>
                <FormControl type="text" placeholder="Search"/>
            </div> */}
            <div>
              <Button variant="outline-primary" className="authBtns">Login</Button>
              <Button variant="primary" className="authBtns">Sign up</Button>
            </div>
        </div>
    </Navbar>
  );
}

export default Navigation;

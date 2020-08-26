import React from 'react';
import Navbar from 'react-bootstrap/Navbar'

function Navigation() {
  return (
    <Navbar bg="light" className="navigation">
        <div className="container">
            <Navbar.Brand>Classroom</Navbar.Brand>
            {/* <FormControl type="text" placeholder="Search"/> */}
        </div>
    </Navbar>
  );
}

export default Navigation;

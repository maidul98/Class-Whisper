import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'font-awesome/css/font-awesome.min.css';
import ListGroup from 'react-bootstrap/ListGroup'

function Sidebar() {
  return (
    <div>
        <p>My classes</p>
        <ListGroup>
        <ListGroup.Item action href="#link1">
        CS 1110
        </ListGroup.Item>
        <ListGroup.Item action href="#link2">
        SOC 2190
        </ListGroup.Item>
        <ListGroup.Item action href="#link3">
        CS 3110
        </ListGroup.Item > 
    </ListGroup>
    </div>
  );
}

export default Sidebar;

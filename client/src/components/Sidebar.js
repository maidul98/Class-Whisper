import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
    <br/>
    <Card>
      <Card.Body>
        <Card.Title>About this course</Card.Title>
        <Card.Text>
        Advanced programming course that emphasizes functional programming techniques and data structures. Programming topics include recursive and higher-order procedures, models of programming language evaluation and compilation, type systems, and polymorphism. Data structures and algorithms covered include graph algorithms, balanced trees, memory heaps, and garbage collection. Also covers techniques for analyzing program performance and correctness.
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  );
}

export default Sidebar;

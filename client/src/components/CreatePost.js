import React, {useContext, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap'
import { UserContext } from "../UserContext";
import Form from 'react-bootstrap/Form';
import { Comment } from 'semantic-ui-react'

function CreateNewPost(props) {
  const { user, setUser } = useContext(UserContext);

  const [hide, setHide] = useState(true)

  const [title, setTitle] = useState(true)
  const [body, setBody] = useState(true)

  function handleSubmit(event){
    event.preventDefault();

    fetch('/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
        user: {}
      }),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
  })
  .catch(console.log)
  }

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <div class="row">
              <div className="col-sm-9">
                <Form.Group controlId="title">
                    <Form.Control onClick={()=>setHide(false)} onChange={event=>setTitle(event.target.value)} placeholder="Make a post" />
                </Form.Group>
              </div>
              <div className="col-sm-3">
              <Form.Group controlId="class">
              <Form.Control as="select">
                <option>CS 5150</option>
                <option>CS 1110</option>
                <option>CS 3110</option>
                <option>ECE 2100</option>
              </Form.Control>
            </Form.Group>
              </div>
            </div>
            {hide? 
            null : 
            <div>
            <Form.Group controlId="post-body">
                <Form.Control as="textarea" rows="3" onChange={event=>setBody(event.target.value)} />
            </Form.Group>
            <button type="submit" className="btn btn-primary btn-block">Share</button>
            </div>
            }
        </Form>
    </div>
  );
}

export default CreateNewPost;

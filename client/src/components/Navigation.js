import React, {useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap'
import { UserContext } from "../UserContext";

function Navigation(props) {
  const { user, setUser } = useContext(UserContext);
  
  return (

    <Navbar bg="light" className="navigation">
        <div className="container">
          <LinkContainer to="/"><Navbar.Brand>Class Whisper</Navbar.Brand></LinkContainer>
            {/* <div>
                <FormControl type="text" placeholder="Search"/>
            </div> */}
            <div>

              {user?.token ?
                <LinkContainer to="/login">
                <Button onClick={()=>setUser(null)} variant="outline-primary" className="authBtns">Logout</Button>
              </LinkContainer>
                           : 
              <div>
                <LinkContainer to="/login">
                  <Button variant="outline-primary" className="authBtns">Login</Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="primary" className="authBtns">Sign up</Button>
                </LinkContainer>
              </div>
               }
        
              
            </div>
        </div>
    </Navbar>
  );
}

export default Navigation;

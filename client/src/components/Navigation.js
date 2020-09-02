import React, {useContext, useEffect, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar'
// import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { LinkContainer } from 'react-router-bootstrap'
import { UserContext } from "../UserContext";
import SelectSearch from 'react-select-search';

import { Button, Placeholder} from 'semantic-ui-react'

function Navigation(props) {
  const ButtonExampleButton = () => <Button>Click Here</Button>
  const { user, setUser } = useContext(UserContext);
  const [options, setOptions] = useState([])
  const [subject, setSubject] = useState(null);
  const [classes, setClasses] = useState([]);
  const [hideSearch, setHideSearch] = useState(true)

  useEffect(()=>{
    fetch('https://classes.cornell.edu/api/2.0/config/subjects.json?roster=FA20').then(response=>{
      return response.json()
    }).then((data)=>{
      console.log(data)
      const l = data.data.subjects
      let options = l.map(({ value }) => ({ "value": value, name:value}))
      setOptions(options)
    })
  }, [])

  useEffect(()=>{
    if (subject != null){
      fetch(`https://classes.cornell.edu/api/2.0/search/classes.json?roster=FA14&subject=${subject}`).then(response=>{
        return response.json()
      }).then((data)=>{
        const l = data.data?.classes
        let classes = l?.map(({ titleShort, crseId, description }) => ({ "value": crseId, name: titleShort}))
        setClasses(classes)
        console.log(classes)
      })
    }
  }, [subject])

  return (
    <div className="navigation">
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <p id="logo-text">Class Whisper</p>
            </div>
            <div className="col-sm-2 no-padding ">
              <SelectSearch options={options} onChange={(value)=>{setSubject(value); setHideSearch(false)}} name="language" search={true} placeholder="Subject" />
            </div>
            <div className="col-sm-5 no-padding ">
              <SelectSearch options={classes} disabled = {hideSearch} name="language" search={true} placeholder="Search for classes after choosing subject" />
            </div>
            <div className="col-sm-3">
            <Button className="authBtns" primary>Sign in</Button>
            <Button className="authBtns">Sign up</Button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Navigation;

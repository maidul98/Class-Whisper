import React, {useEffect, useState, useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import 'font-awesome/css/font-awesome.min.css';

import NewsFeedPost from './NewsFeedPost'
import SideBar from './Sidebar'

import { UserContext } from "../UserContext";
import CreateNewPost from './CreatePost'

import {Header, Comment} from 'semantic-ui-react'

import ClassInformaion from './ClassInformaion'

function NewsFeed({history}) {
  const [posts, setPosts] = useState([])
  const {user, setUser} = useContext(UserContext);

  useEffect(()=>{
    fetch('/posts').then(res=>res.json()).then(postData=>setPosts(postData))
  }, [])

  return (
    <div>
      <div className="newsFeedContainer">
      <br/>
        <div className="row">
          <div className="col-sm-8">
          {/* <Message warning onDismiss={()=>console.log('dismissed')}>
            <Message.Header>Email is unverified</Message.Header>
            <p>Please follow the instructions send to sent to mi252@cornell.edu to verify your account, otherwise your account will be deleted</p>
          </Message> */}
          <Header as='h2'>CS 3110: Data Structures and Functional Programming</Header>
          <CreateNewPost/>
          <Button variant="secondary" className="newsfeedBtnFilter"> <i className="fas fa-fire"></i> Trending</Button>
          <Button variant="secondary" className="newsfeedBtnFilter"> <i className="fas fa-rss"></i> New</Button>
          {[1,2,2,3,4].map(post=><NewsFeedPost post={post}/>)}
          </div>
          <div className="col-sm-3">
            <SideBar/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsFeed;

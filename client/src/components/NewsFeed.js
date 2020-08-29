import React, {useEffect, useState, useContext} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'font-awesome/css/font-awesome.min.css';

import NewsFeedPost from './NewsFeedPost'
import SideBar from './Sidebar'

import { UserContext } from "../UserContext";

function NewsFeed({history}) {
  const [posts, setPosts] = useState([])

  const {user, setUser} = useContext(UserContext);

  useEffect(()=>{
    fetch('/posts').then(res=>res.json()).then(postData=>setPosts(postData))
  }, [])

  return (
    <div>
      <div className="newsFeedContainer">
      <Button variant="secondary" className="newsfeedBtnFilter"> <i className="fas fa-fire"></i> Trending</Button>
      <Button variant="secondary" className="newsfeedBtnFilter"> <i className="fas fa-rss"></i> New</Button>
      <br/>
        <div className="row">
          <div className="col-sm-8">
          {posts.map(post=><NewsFeedPost post={post}/>)}
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

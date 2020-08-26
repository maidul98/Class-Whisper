import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'font-awesome/css/font-awesome.min.css';

import NewsFeedPost from './NewsFeedPost'
import SideBar from './Sidebar'

function NewsFeed() {
  return (
    <div>
      <div className="newsFeedContainer">
      <Button variant="secondary" className="newsfeedBtnFilter"> <i class="fas fa-fire"></i> Trending</Button>
      <Button variant="secondary" className="newsfeedBtnFilter"> <i class="fas fa-rss"></i> New</Button>
      <br/>
        <div className="row">
          <div className="col-sm-8">
            {[1,1,2,3,4,5,6,4,44,4,4,4].map(()=><NewsFeedPost/>)}
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

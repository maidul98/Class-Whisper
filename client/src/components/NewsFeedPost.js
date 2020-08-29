import React, { useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'font-awesome/css/font-awesome.min.css';
import { LinkContainer } from 'react-router-bootstrap'

function NewsFeedPost(props) {
  useEffect(()=>{
    console.log('update')
    console.log(props.post.title)
  })
  return (
    <div>
      <div className="post">
        <div className="row">
          <div className="col-sm-1">
            <div className="postVotes">
            <i class="fas fa-arrow-up voteIcon"></i>
            <p class="postVotes">{props.post.votes}</p>
            <i class="fas fa-arrow-down voteIcon"></i>
            </div>
          </div>
          <div className="col-sm-11">
            <div className="postedDetails">
              <span className="postedIn">class/CS 5150</span> <span>posted by mi252</span>
            </div>
            <LinkContainer to='/post'>
              <div className="postTitle">
                <h5>{props.post.title}</h5>
              </div>
            </LinkContainer>
            <div className="postStats">
            <span className="commentsCount"><i className="fas fa-comment-alt postCommentsIcon"></i> 23 comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsFeedPost;

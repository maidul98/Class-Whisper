import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import { LinkContainer } from "react-router-bootstrap";

function NewsFeedPost({ post }) {
  return (
    <div>
      <div className="post">
        <div className="row">
          <div className="col-sm-1">
            <div className="postVotes">
              <i className="fas fa-arrow-up voteIcon"></i>
              <p className="postVotes">100</p>
              <i className="fas fa-arrow-down voteIcon"></i>
            </div>
          </div>
          <div className="col-sm-11">
            <div className="postedDetails">
              <span className="postedIn">class/CS 5150</span>{" "}
              <span>posted by mi252</span>
            </div>
            <LinkContainer to="/post">
              <div className="postTitle">
                <h5>{post.title}</h5>
              </div>
            </LinkContainer>
            <div className="postStats">
              <span className="commentsCount">
                <i className="fas fa-comment-alt postCommentsIcon"></i>{" "}
                {post.comments.length} comments
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsFeedPost;

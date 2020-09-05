import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import { LinkContainer } from "react-router-bootstrap";

function NewsFeedPost({ post }) {
  const [vote, setVote] = useState(post.votes);

  useEffect(() => {}, [vote]);

  return (
    <div>
      {console.log(post)}
      <div className="post">
        <div className="row">
          <div className="col-sm-1">
            <div className="postVotes">
              <i
                className="fas fa-arrow-up voteIcon"
                onClick={() => setVote((past) => (past += 1))}
              ></i>
              <p className="postVotes">{vote}</p>
              <i
                className="fas fa-arrow-down voteIcon"
                onClick={() => setVote((past) => (past -= 1))}
              ></i>
            </div>
          </div>
          <div className="col-sm-11">
            <div className="postedDetails">
              <span className="postedIn">
                class/{post?.class_id?.subject} {post?.class_id?.catalogNbr}
              </span>{" "}
              <span>posted by {post?.user?.username}</span>
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

import React, { useState, useEffect, useContext } from "react";
import "font-awesome/css/font-awesome.min.css";
import { LinkContainer } from "react-router-bootstrap";
import Moment from "react-moment";
import { UserContext } from "../UserContext";

function NewsFeedPost({ post, body }) {
  const [vote, setVote] = useState(post?.votes?.voteCounts);
  const [currentVote, updateCurrentVote] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const votes = post.votes;
    console.log(user._id, "user from votes");
    if (votes?.downvoters?.includes(user._id)) {
      updateCurrentVote("down");
      console.log("set down");
    }

    if (votes?.upvoters.includes(user._id)) {
      updateCurrentVote("up");
      console.log("set up");
    }
  }, [user]);

  function handleUp() {
    if (user._id == undefined) {
      return alert("Vote not casted, login to do so!");
    }

    if (currentVote == "up") {
      updateCurrentVote("");
      updateVoteServer("");
      setVote((prev) => (prev -= 1));
    } else if (currentVote == "down") {
      updateCurrentVote("up");
      updateVoteServer("up");
      setVote((prev) => (prev += 2));
    } else {
      updateCurrentVote("up");
      updateVoteServer("up");
      setVote((prev) => (prev += 1));
    }
  }

  function handleDown() {
    if (user._id == undefined) {
      return alert("Vote not casted, login to do so!");
    }

    if (currentVote == "down") {
      updateCurrentVote("");
      setVote((prev) => (prev += 1));
      updateVoteServer("");
    } else if (currentVote == "up") {
      updateCurrentVote("down");
      updateVoteServer("down");
      setVote((prev) => (prev -= 2));
    } else {
      updateCurrentVote("down");
      updateVoteServer("down");
      setVote((prev) => (prev -= 1));
    }
  }

  function updateVoteServer(voteType) {
    console.log(voteType);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/votes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        voteType: voteType,
        postId: post?._id,
      }),
    });
  }

  return (
    <div>
      <div className="post">
        <div className="row">
          <div className="col-sm-1">
            <div className="postVotes">
              <i
                className={`fas fa-arrow-up voteIcon ${
                  currentVote == "up" ? "activeDown" : null
                }`}
                onClick={handleUp}
              ></i>
              <p className="postVotes">{vote}</p>
              <i
                className={`fas fa-arrow-down voteIcon ${
                  currentVote == "down" ? "activeDown" : null
                }`}
                onClick={handleDown}
              ></i>
            </div>
          </div>
          <div className="col-sm-11">
            <div className="postedDetails">
              <span className="postedIn">
                class/{post?.class_id?.subject} {post?.class_id?.catalogNbr}
              </span>{" "}
              <span>posted by {post?.user?.username}</span>
              <span> at </span>
              <Moment format={"h:mma"} className="postDate">
                {post?.createdAt}
              </Moment>
            </div>
            <LinkContainer to={`/post/${post?._id}`}>
              <div className="postTitle">
                <h5>{post?.title}</h5>
              </div>
            </LinkContainer>
            <div
              className="postBody"
              style={{ display: body ? "inherit" : "none" }}
            >
              <p>{post?.body}</p>
            </div>
            <div className="postStats">
              <span className="commentsCount">
                <i className="fas fa-comment-alt postCommentsIcon"></i>{" "}
                {post?.comments_count} comment(s)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsFeedPost;

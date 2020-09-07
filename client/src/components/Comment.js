import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "font-awesome/css/font-awesome.min.css";
// import { Button, Comment, Form, Header } from "semantic-ui-react";
import { useState } from "react";

function Comment({ comment }) {
  const [replyFrom, setReplyFrom] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

  function submitReply() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/comments/reply`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        post_id: comment?.post,
        body: reply,
        comment_parent_id: comment?._id,
      }),
    })
      .then((res) => res.json())
      .then((newReply) => {
        setReplies((prev) => [...prev, newReply]);
        setReply("");
        setReplyFrom(false);
      });
  }

  function pullReplies() {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/comments/reply?parentId=${comment?._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setReplies(data);
        }
      });
  }

  return (
    <div className="comment">
      <div className="content">
        <a className="author">{comment?.user?.username}</a>
        <div className="metadata">
          <span className="date">Just now</span>
        </div>
        <div className="text">{comment?.body}</div>
        <div className="actions">
          <a className="reply" onClick={() => setReplyFrom(true)}>
            Reply
          </a>
          <a className="reply" onClick={pullReplies}>
            {`Show replies (${comment.repliesCount})`}
          </a>
          <form
            className="ui reply form"
            style={{ display: replyFrom ? "inherit" : "none" }}
          >
            <div className="field">
              <textarea
                rows="4"
                onChange={(event) => setReply(event.target.value)}
                value={reply}
              ></textarea>
            </div>
            <div className="ui submit blue button" onClick={submitReply}>
              Add Reply
            </div>
            <div
              className="ui submit button"
              onClick={() => setReplyFrom(false)}
            >
              Cancel
            </div>
          </form>
        </div>
      </div>
      <div
        className="comments"
        style={{ display: replies.length == 0 ? "none" : "inherit" }}
      >
        {replies.map((singleReply) => (
          <Comment comment={singleReply} />
        ))}
      </div>
    </div>
  );
}

export default Comment;

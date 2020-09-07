import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "font-awesome/css/font-awesome.min.css";
// import { Button, Comment, Form, Header } from "semantic-ui-react";
import Comment from "./Comment";

function Comments({ comments }) {
  return (
    <div class="ui comments">
      <h3 class="ui dividing header">Comments</h3>
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </div>
  );
}

export default Comments;

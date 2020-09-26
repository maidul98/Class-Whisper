import React, { useEffect, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Comments from "./Comments";
import "font-awesome/css/font-awesome.min.css";
import { Button, Form } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import NewsFeedPost from "./NewsFeedPost";
import { UserContext } from "../UserContext";

function SinglePost() {
  const { user, setUser } = useContext(UserContext);
  const authHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };

  const { postId } = useParams();
  const [post, setPostInfo] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // get post detials
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/posts/single?postId=${postId}`,
      {
        headers: authHeader,
      }
    )
      .then((res) => res.json())
      .then((data) => setPostInfo(data));

    // get comments
    fetch(`${process.env.REACT_APP_BACKEND_URL}/comments?id=${postId}`, {
      headers: authHeader,
    })
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  function handleCommentSubmit() {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/comments`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        post_id: post?._id,
        body: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments((prev) => [data, ...prev]);
        setComment("");
      });
  }

  return (
    <div>
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <NewsFeedPost post={post} body={post?.body} />
          <div className="addComment">
            <Form
              onChange={(event) => setComment(event.target.value)}
              onSubmit={handleCommentSubmit}
            >
              <Form.TextArea value={comment} />
              <Button
                className="pull-right"
                content="Add Comment"
                primary
                disabled={user?._id ? false : true}
              />
              <div className="clearfix"></div>
            </Form>
          </div>
          <div className="postComments">
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;

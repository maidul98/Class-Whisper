import React, { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../UserContext";
import Form from "react-bootstrap/Form";
import ImageUploader from "react-images-upload";

function CreateNewPost({ enrollmentStatus, classInfo, setPosts }) {
  const { user, setUser } = useContext(UserContext);
  const [hide, setHide] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const authHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };

  useEffect(() => {
    const uploadbtn = document.getElementsByClassName("chooseFileButton")[0];
    if (uploadbtn) {
      uploadbtn.setAttribute("disabled", "true");
    }
  }, [hide]);

  function formCleanUp() {
    setBody("");
    setTitle("");
    setHide(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        user: user,
        class: classInfo._id,
      }),
      headers: authHeader,
    })
      .then((res) => res.json())
      .then((post) => {
        setPosts((prev) => [post, ...prev]);
        formCleanUp();
      })
      .catch(console.log);
  }

  return (
    <div
      className="createPost"
      style={{
        display: enrollmentStatus == false ? "none" : "initial",
      }}
    >
      <Form onSubmit={handleSubmit} className="createPost">
        <div className="row">
          <div className="col-sm-12">
            <Form.Group controlId="title">
              <Form.Control
                autoComplete="off"
                onClick={() => setHide(false)}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Post title"
                value={title}
              />
            </Form.Group>
          </div>
        </div>
        {hide ? null : (
          <div>
            <Form.Group controlId="post-body">
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Have more to say? Put it here"
                onChange={(event) => setBody(event.target.value)}
                value={body}
              />
            </Form.Group>
            <ImageUploader
              disabled={true}
              withIcon={true}
              buttonText="Upload images feature coming soon..."
              onChange={() => console.log("dropped")}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
            {/* <p>(You can upload your favorite meme soon!)</p> */}
            <button
              type="submit"
              className="btn btn-primary btn-block submitPost"
            >
              Share
            </button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default CreateNewPost;

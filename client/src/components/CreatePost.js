import React, { useContext, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../UserContext";
import Form from "react-bootstrap/Form";
import ImageUploader from "react-images-upload";

function CreateNewPost({ classes, enrollmentStatus }) {
  const { user, setUser } = useContext(UserContext);
  const [hide, setHide] = useState(true);
  const [title, setTitle] = useState(true);
  const [body, setBody] = useState("");
  const [classId, setClassId] = useState(classes[0]?._id);
  const authHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };

  useEffect(() => {
    setClassId(classes[0]?._id);
  }, [classes]);

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        user: user,
        class: classId,
      }),
      headers: authHeader,
    })
      .then((res) => {
        if (res.status == 200) {
          alert("Your post has been posted! Refresh the page to see it");
        }
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
          <div className="col-sm-9">
            <Form.Group controlId="title">
              <Form.Control
                autoComplete="off"
                onClick={() => setHide(false)}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Make a post"
              />
            </Form.Group>
          </div>
          <div className="col-sm-3">
            <Form.Group controlId="class">
              <Form.Control
                as="select"
                onChange={(event) => setClassId(event.target.value)}
              >
                {classes.map((singleClass) => (
                  <option value={singleClass._id}>
                    {`${singleClass.subject} ${singleClass.catalogNbr}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
        </div>
        {hide ? null : (
          <div>
            <Form.Group controlId="post-body">
              <Form.Control
                as="textarea"
                rows="3"
                onChange={(event) => setBody(event.target.value)}
              />
            </Form.Group>

            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={() => console.log("dropped")}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />

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

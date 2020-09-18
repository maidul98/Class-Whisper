import React, { useContext, useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../UserContext";
import Form from "react-bootstrap/Form";
import ImageUploader from "react-images-upload";
import ReCAPTCHA from "react-google-recaptcha";

function CreateNewPost({ enrollmentStatus, classInfo, setPosts }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const { user, setUser } = useContext(UserContext);
  const [hide, setHide] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [googleRecap, setGoogleRecap] = useState(null);
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

  async function handleSubmit(event) {
    event.preventDefault();
    if (googleRecap == null) {
      return alert("Please verify you are not a robot");
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        user: user,
        class: classInfo._id,
        reCAPTCHA: googleRecap,
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

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setHide(true);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

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
          <div ref={wrapperRef}>
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
            <div className="row">
              <div className="col-sm-6">
                <ReCAPTCHA
                  sitekey="6LeiO80ZAAAAAKags4iitCTWC2yPHoT3KYpnvG4W"
                  onChange={(value) => setGoogleRecap(value)}
                  badge={"inline"}
                />
              </div>
              <div className="col-sm-6">
                <button
                  type="submit"
                  className="btn btn-primary btn-block submitPost"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}

export default CreateNewPost;

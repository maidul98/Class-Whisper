import React, { Component, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import Alert from "react-bootstrap/Alert";

function Register(props) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    fetch("/users/register", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((userObj) => {
        if (userObj.user) {
          setUser(userObj.user);
          localStorage.setItem("token", userObj.token);
          props.history.push("/");
        } else {
          setErrors(userObj.errors);
        }
      })
      .catch(console.log);
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          {errors.map((error) => (
            <Alert variant="warning">{error}</Alert>
          ))}
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              placeholder="netid@cornell.edu"
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              onChange={(event) => setUsername(event.target.value)}
              className="form-control"
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

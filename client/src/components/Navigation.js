import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../UserContext";
import AsyncSelect from "react-select/async";
import { Button, Placeholder } from "semantic-ui-react";
import io from "socket.io-client";
var debounce = require("es6-promise-debounce");

function Navigation(props) {
  const { user, setUser } = useContext(UserContext);
  const [notifCount, setNotifCount] = useState(0);

  function getOptions(query) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/search/class?&query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(
            data.map(({ subject, term, catalogNbr, completeTitle }) => ({
              value: { subject: subject, catalogNbr: catalogNbr, term: term },
              label: completeTitle,
            }))
          );
        })
        .catch(reject);
    });
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications/count`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifCount(data.count);
      });
  }, []);

  return (
    <div className="navigation">
      <div className="container">
        <div className="row">
          <div className="col-sm-2">
            <LinkContainer to="/">
              <p id="logo-text">Class Whisper</p>
            </LinkContainer>
          </div>
          <div className="col-sm-6">
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={debounce(getOptions, 500)}
              placeholder="Search for classes"
              onChange={({ value }) => {
                props.history.push(
                  `/class/${value.term.toLowerCase()}/${value.subject.toLowerCase()}/${
                    value.catalogNbr
                  }`
                );
              }}
            />
          </div>
          <div className="col-sm-4">
            {user?._id == undefined ? (
              <div>
                <LinkContainer to="/login">
                  <Button className="authBtns" primary>
                    Sign in
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button className="authBtns">Sign up</Button>
                </LinkContainer>
              </div>
            ) : (
              <div>
                <Button
                  variant="secondary"
                  className="newsfeedBtnFilter"
                  onClick={() => {
                    props.history.push("/notifications");
                  }}
                >
                  <i className="fas fa-bell"></i>

                  {notifCount != 0 ? (
                    <span className="notification_badge">{notifCount}</span>
                  ) : null}
                </Button>
                <Button
                  className="authBtns logout"
                  onClick={() => {
                    setUser({});
                    localStorage.removeItem("token");
                  }}
                >
                  Logout of {user.username.substring(0, 10) + "..."}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Navigation);

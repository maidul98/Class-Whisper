import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Toast from "react-bootstrap/Toast";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../UserContext";
import SelectSearch from "react-select-search";
import { Button, Placeholder } from "semantic-ui-react";

function Navigation(props) {
  const debounce = require("es6-promise-debounce");
  const { user, setUser } = useContext(UserContext);
  const [notifCount, setNotifCount] = useState(0);

  function getOptions(query) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/search/class?&query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          resolve(
            data.map(({ subject, term, catalogNbr, completeTitle }) => ({
              value: { subject: subject, catalogNbr: catalogNbr, term: term },
              name: completeTitle,
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
            <SelectSearch
              options={[]}
              getOptions={debounce(getOptions, 500)}
              onChange={(value) =>
                props.history.push(
                  `/class/${value.term.toLowerCase()}/${value.subject.toLowerCase()}/${
                    value.catalogNbr
                  }`
                )
              }
              name="language"
              search={true}
              placeholder="Search for classes, select with up and down arrows and choose with enter key"
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

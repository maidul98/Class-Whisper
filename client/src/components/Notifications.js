import React, { Component, useState, useContext, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import { Message } from "semantic-ui-react";
import { LinkContainer } from "react-router-bootstrap";
import Moment from "react-moment";

function Notifications(props) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications/unread`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((notif) => {
        setNotifications(notif);
        const notif_ids = notif.map((singleNotif) => singleNotif._id);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications/read`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            notif_ids: notif_ids,
          }),
        });
      });
  }, []);

  return (
    <div className="newsFeedContainer">
      <h1>Notifications</h1>
      {notifications.length == 0 ? (
        <Message info size={"huge"}>
          <Message.Header>No notifications yet</Message.Header>
          <p>Go be a little active and check back here 🤩</p>
        </Message>
      ) : null}
      {notifications.map((notification) => {
        return (
          <Toast className="toast-notifs">
            <Toast.Header>
              <div className="mr-auto">
                <strong>{notification?.sender?.username}</strong>
                {` ${notification.action} ${notification?.preposition} `}
                <LinkContainer to={`post/${notification?.post?._id}`}>
                  <strong className="cursor">
                    {notification?.post?.title}
                  </strong>
                </LinkContainer>
              </div>
              <small>
                <Moment format={"MMMM Do, YYYY h:mma"}>
                  {notification.createdAt}
                </Moment>
              </small>
            </Toast.Header>
            <Toast.Body>{notification.body}</Toast.Body>
          </Toast>
        );
      })}
    </div>
  );
}

export default Notifications;

import React, { Component, useState, useContext } from "react";
import Toast from "react-bootstrap/Toast";

function Notifications(props) {
  return (
    <div className="newsFeedContainer">
      <h1>Notifications</h1>
      {[1, 2, 2, 2, 4, 4, 4, 4, 4].map(() => {
        return (
          <Toast className="toast-notifs">
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">
                rk342 replied to your post in class/3110
              </strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>post preview goes hereeee</Toast.Body>
          </Toast>
        );
      })}
    </div>
  );
}

export default Notifications;

import React, { Component, useState, useContext, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import { Message } from "semantic-ui-react";
import { LinkContainer } from "react-router-bootstrap";
import io from "socket.io-client";
import "react-chat-elements/dist/main.css";
import Button from "react-bootstrap/Button";
import { ChatList, MessageList, Input } from "react-chat-elements";

function Chat(props) {
  const [message, setMessage] = useState({ id: undefined });

  useEffect(() => {
    if (message.id != undefined) {
      console.log("selected a message");
    }
  }, [message]);

  return (
    <div>
      <Button
        variant="secondary"
        className="newsfeedBtnFilter"
        style={{ display: message.id == undefined ? "none" : null }}
        onClick={() => setMessage({ id: undefined })}
      >
        Back
      </Button>
      <div style={{ display: message.id != undefined ? "none" : null }}>
        <ChatList
          onClick={(message) => setMessage({ id: message.id })}
          className="chat-list"
          dataSource={[
            {
              avatar:
                "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
              title: "theflyingdog",
              subtitle: "What are you doing?",
              date: new Date(),
              unread: 0,
              id: "hahaha",
            },
            {
              avatar:
                "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
              title: "theflyingdog",
              subtitle: "What are you doing?",
              date: new Date(),
              unread: 10,
            },
          ]}
        />
      </div>
      <div style={{ display: message.id == undefined ? "none" : null }}>
        <MessageList
          className="message-list"
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={[
            {
              position: "right",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
            {
              position: "left",
              type: "text",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
              date: new Date(),
            },
          ]}
        />
        <Input
          placeholder="Type here..."
          multiline={true}
          rightButtons={
            <Button color="white" backgroundColor="black">
              Send
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default Chat;

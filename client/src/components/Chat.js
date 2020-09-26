import React, { Component, useState, useContext, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import { Message } from "semantic-ui-react";
import { LinkContainer } from "react-router-bootstrap";
import Moment from "react-moment";
import io from "socket.io-client";
import { Launcher } from "react-chat-window";

function Chat(props) {
  const [messageList, setMessages] = useState([
    {
      author: "them",
      type: "text",
      data: {
        text: "some text",
      },
    },
    {
      author: "me",
      type: "emoji",
      data: {
        code: "someCode",
      },
    },
    {
      author: "me",
      type: "file",
      data: {
        url: "somefile.mp3",
        fileName: "Any old name",
      },
    },
  ]);

  function _onMessageWasSent(message) {
    setMessages((prev) => [...prev, message]);
  }

  function _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      });
    }
  }

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: "react-chat-window",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={_onMessageWasSent.bind(this)}
        messageList={messageList}
        showEmoji
      />
    </div>
  );
}

export default Chat;

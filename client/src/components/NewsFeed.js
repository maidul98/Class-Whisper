import React, { useEffect, useState, useContext, usep } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "font-awesome/css/font-awesome.min.css";

import NewsFeedPost from "./NewsFeedPost";
import SideBar from "./Sidebar";
import { UserContext } from "../UserContext";
import CreateNewPost from "./CreatePost";
import { Header, Message } from "semantic-ui-react";

function NewsFeed() {
  const authHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [classes, setClasses] = useState([]);

  const { term, subject, classNum } = useParams(); // user is viewing a specific class
  const [isClassFeed, setClassFeed] = useState(false);
  const [classInfo, setClassInfo] = useState({});
  const [enrollmentStatus, setEnrollmentStatus] = useState(false);

  useEffect(() => {
    // create class if it hasn't been created
    if (term != null && classNum != null && subject != null) {
      setClassFeed(true);
      console.log("this is a class");
    }
    //get class info
    if (isClassFeed) {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/classes/info?term=${term}&classNum=${classNum}&subject=${subject}`,
        {
          headers: authHeader,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // check enrolment status
          fetch(
            `${process.env.REACT_APP_BACKEND_URL}/classes/check-enrollment?classId=${data._id}`,
            {
              headers: authHeader,
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setEnrollmentStatus(data.enrollmentStatus);
            })
            .catch((error) => console.log(error));

          setClassInfo(data);
        })
        .catch((error) => console.log(error));
    }

    //get posts for newsfeed
    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`)
      .then((res) => res.json())
      .then((postData) => setPosts(postData));

    // get all classes
    fetch(`${process.env.REACT_APP_BACKEND_URL}/classes/myclasses`, {
      headers: authHeader,
    })
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, [isClassFeed, term, subject, classNum, enrollmentStatus]);

  function joinOrLeave(type) {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/classes/${type}?classId=${classInfo._id}`,
      {
        method: "post",
        headers: authHeader,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (type == "join") {
          setEnrollmentStatus(true);
        } else {
          setEnrollmentStatus(false);
        }
      })
      .catch((error) => console.log(error));
  }

  function leaveOrJoinBtn() {
    if (isClassFeed && enrollmentStatus == false) {
      return (
        <Button
          variant="success"
          className="submitPost newsfeedBtnFilter float-right"
          onClick={() => joinOrLeave("join")}
        >
          Join class
        </Button>
      );
    } else if (isClassFeed && enrollmentStatus == true) {
      return (
        <Button
          variant="outline-secondary"
          className="newsfeedBtnFilter float-right"
          onClick={() => joinOrLeave("leave")}
        >
          Leave class
        </Button>
      );
    }
  }

  return (
    <div>
      <div className="newsFeedContainer">
        <br />
        <div className="row">
          <div className="col-sm-8">
            {isClassFeed ? (
              <Header as="h2">{classInfo.completeTitle}</Header>
            ) : null}

            <CreateNewPost
              classes={classes}
              enrollmentStatus={enrollmentStatus}
            />
            <Button variant="secondary" className="newsfeedBtnFilter">
              {" "}
              <i className="fas fa-fire"></i> Trending
            </Button>
            <Button variant="secondary" className="newsfeedBtnFilter">
              {" "}
              <i className="fas fa-rss"></i> New
            </Button>

            {leaveOrJoinBtn()}

            <div className="clearfix"></div>

            {posts.length == 0 ? (
              <Message info size={"huge"}>
                <Message.Header>
                  Looks like there aren't any posts yet
                </Message.Header>
                <p>Be brave and break the ice 😳</p>
              </Message>
            ) : (
              posts.map((post) => <NewsFeedPost post={post} />)
            )}
          </div>
          <div className="col-sm-3">
            <SideBar classes={classes} classInfo={classInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsFeed;

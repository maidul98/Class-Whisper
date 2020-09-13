import React, { useEffect, useState, useContext, usep } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "font-awesome/css/font-awesome.min.css";

import NewsFeedPost from "./NewsFeedPost";
import SideBar from "./Sidebar";
import { UserContext } from "../UserContext";
import CreateNewPost from "./CreatePost";
import { Header, Message } from "semantic-ui-react";
import { set } from "mongoose";

function NewsFeed() {
  const { user, setUser } = useContext(UserContext);
  const authHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };
  const [posts, setPosts] = useState([]);

  const [classes, setClasses] = useState([]);

  const { term, subject, classNum } = useParams(); // user is viewing a specific class
  const [isClassFeed, setClassFeed] = useState(false);
  const [classInfo, setClassInfo] = useState({});
  const [enrollmentStatus, setEnrollmentStatus] = useState(false);

  const [filter, setFilter] = useState({ by: "hot" });

  useEffect(() => {
    let by = "";
    let query = "";

    if (filter.by == "hot") {
      by = "/trending-posts";
    }

    if (term != null && classNum != null && subject != null) {
      setClassFeed(true);
    }

    if (isClassFeed) {
      // pull class info
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
              setEnrollmentStatus(data.enrollmentStatus);
            })
            .catch((error) => console.log(error));

          setClassInfo(data);

          // change query
          if (isClassFeed) {
            query = `?classId=${data._id}`;
            console.log("this is a class");
          }

          //pull newsfeed post
          fetch(`${process.env.REACT_APP_BACKEND_URL}/posts${by}${query}`)
            .then((res) => res.json())
            .then((postData) => setPosts(postData))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    } else {
      console.log("not a class feed");
      fetch(`${process.env.REACT_APP_BACKEND_URL}/posts${by}${query}`)
        .then((res) => res.json())
        .then((postData) => setPosts(postData))
        .catch((error) => console.log(error));
    }

    // get all users classes
    // if (user._id != undefined) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/classes/myclasses`, {
      headers: authHeader,
    })
      .then((res) => res.json())
      .then((data) => setClasses(data));
    // }
  }, [isClassFeed, term, subject, classNum, enrollmentStatus, filter]);

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

    // clean up
    return () => {
      setEnrollmentStatus(false);
    };
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
              classInfo={classInfo}
              classes={classes}
              enrollmentStatus={enrollmentStatus}
              setPosts={setPosts}
            />
            <Button
              variant={filter.by == "hot" ? "dark" : "secondary"}
              className="newsfeedBtnFilter"
              onClick={() => setFilter({ by: "hot" })}
            >
              {" "}
              <i className="fas fa-fire"></i> Trending
            </Button>
            <Button
              variant={filter.by == "new" ? "dark" : "secondary"}
              className="newsfeedBtnFilter"
              onClick={() => setFilter({ by: "new" })}
            >
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
              posts.map((post) => {
                return <NewsFeedPost post={post} />;
              })
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

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
  const { user, setUser } = useContext(UserContext);
  const authHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);

  const [classes, setClasses] = useState([]);

  const { term, subject, classNum } = useParams(); // user is viewing a specific class
  const [isClassFeed, setClassFeed] = useState(false);
  const [classInfo, setClassInfo] = useState({});
  const [enrollmentStatus, setEnrollmentStatus] = useState(false);

  const [filter, setFilter] = useState({
    by: "/trending-posts",
    active: "hot",
  });

  useEffect(() => {
    setSkip(0);
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

        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/posts${filter.by}?classId=${data._id}`
        )
          .then((res) => res.json())
          .then((postData) => setPosts(postData))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [isClassFeed, term, subject, classNum, filter]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/classes/myclasses`, {
      headers: authHeader,
    })
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, [enrollmentStatus]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/posts${
        filter.by
      }${`?classId=${classInfo?._id}&skip=${skip}`}`
    )
      .then((res) => res.json())
      .then((postData) => setPosts((prev) => [...prev, ...postData]))
      .catch((error) => console.log(error));
  }, [skip]);

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
    if (enrollmentStatus == false) {
      return (
        <Button
          variant="success"
          className="joinClass newsfeedBtnFilter float-right"
          onClick={() => joinOrLeave("join")}
        >
          Join class
        </Button>
      );
    } else {
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
            <Header as="h2">{classInfo?.completeTitle}</Header>

            <CreateNewPost
              classInfo={classInfo}
              classes={classes}
              enrollmentStatus={enrollmentStatus}
              setPosts={setPosts}
            />
            <Button
              variant={filter.active == "hot" ? "dark" : "secondary"}
              className="newsfeedBtnFilter"
              onClick={() =>
                setFilter({ by: "/trending-posts", active: "hot" })
              }
            >
              {" "}
              <i className="fas fa-fire"></i> Trending
            </Button>
            <Button
              variant={filter.active == "new" ? "dark" : "secondary"}
              className="newsfeedBtnFilter"
              onClick={() => setFilter({ by: "/new", active: "new" })}
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
            {skip != posts.length ? (
              <div className="text-center">
                <button
                  onClick={() => setSkip(posts.length)}
                  className="newsfeedBtnFilter btn btn-secondary center"
                >
                  Check for more
                </button>
              </div>
            ) : null}
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

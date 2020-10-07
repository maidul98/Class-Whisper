import React, { useEffect, useState, useContext, usep } from "react";
import Button from "react-bootstrap/Button";
import "font-awesome/css/font-awesome.min.css";

import NewsFeedPost from "./NewsFeedPost";
import SideBar from "./Sidebar";
import { UserContext } from "../UserContext";
import CreateNewPost from "./CreatePost";
import { Header, Message } from "semantic-ui-react";

function NewsFeed() {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [classes, setClasses] = useState([]);
  const [classInfo, setClassInfo] = useState({});
  const [filter, setFilter] = useState({
    by: `/trending-posts`,
    active: "hot",
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts${filter.by}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((postData) => setPosts(postData))
      .catch((error) => console.log(error));
  }, [filter]);

  useEffect(() => {
    if (skip > 0) {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/posts${filter.by}?skip=${skip}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((res) => res.json())
        .then((postData) =>
          setPosts((prev) => {
            return [...prev, ...postData];
          })
        )
        .catch((error) => console.log(error));
    }
  }, [skip]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/classes/myclasses`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  useEffect(() => {
    if (user._id != undefined) {
      setFilter({ by: "/my-trending-posts", active: "my-class" });
    } else {
      setFilter({ by: "/trending-posts", active: "hot" });
    }
  }, [user]);

  return (
    <div>
      <div className="newsFeedContainer">
        <br />
        <div className="row">
          <div className="col-sm-8">
            {user._id != undefined ? (
              <Button
                variant={filter.active == "my-class" ? "dark" : "secondary"}
                className="newsfeedBtnFilter"
                onClick={() =>
                  setFilter({ by: "/my-trending-posts", active: "my-class" })
                }
              >
                {" "}
                <i className="fas fa-fire"></i> My classes
              </Button>
            ) : null}
            <Button
              variant={filter.active == "hot" ? "dark" : "secondary"}
              className="newsfeedBtnFilter"
              onClick={() =>
                setFilter({ by: "/trending-posts", active: "hot" })
              }
            >
              {" "}
              <i className="fas fa-fire"></i> Trending at Cornell
            </Button>
            <Button
              variant={filter.active == "new" ? "dark" : "secondary"}
              className="newsfeedBtnFilter"
              onClick={() => setFilter({ by: "/new", active: "new" })}
            >
              {" "}
              <i className="fas fa-rss"></i> New at Cornell
            </Button>

            <div className="clearfix"></div>

            {posts.length == 0 ? (
              <Message info size={"huge"}>
                <Message.Header>
                  {/* {
                    filter.by = "my-class"
                      ? "Looks like you haven't joined any classes yet"
                      : "Looks like there aren't any posts yet"
                  } */}
                </Message.Header>
                {/* <p>
                  {
                    (filter.by = "my-class"
                      ? "Join your classes by searching for them"
                      : "Be brave and break the ice 😳")
                  }
                </p> */}
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

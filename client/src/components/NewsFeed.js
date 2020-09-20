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
    by: "/trending-posts",
    active: "hot",
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/posts${filter.by}`)
      .then((res) => res.json())
      .then((postData) => setPosts(postData))
      .catch((error) => console.log(error));
  }, [filter]);

  useEffect(() => {
    if (skip > 0) {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/posts${filter.by}?skip=${skip}`
      )
        .then((res) => res.json())
        .then((postData) =>
          setPosts((prev) => {
            console.log(postData.length);
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

  return (
    <div>
      <div className="newsFeedContainer">
        <br />
        <div className="row">
          <div className="col-sm-8">
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

import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import NewsFeed from "./components/NewsFeed";
import ClassNewsFeed from "./components/ClassNewsFeed";
import Login from "./components/Login";
import Register from "./components/Register";
import SinglePost from "./components/SinglePost";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserContext } from "./UserContext";
import Auth from "./components/Auth";
import ReactGA from "react-ga";
import Notifications from "./components/Notifications";
import { createBrowserHistory } from "history";

const trackingId = "UA-178459989-1";
ReactGA.initialize(trackingId);
const history = createBrowserHistory();
// Initialize google analytics page view tracking
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

function App() {
  const [user, setUser] = useState({});

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    Auth.getUser().then((user) => {
      console.log(user._id);
      if (user?._id != undefined) {
        setUser(user);
      }
    });
  }, []);

  return (
    <Router>
      <UserContext.Provider value={value}>
        <Navigation />
        <Route exact path="/" component={NewsFeed} />

        <Route exact path="/login" component={Login} />

        <Route exact path="/register" component={Register} />

        <Route exact path="/post/:postId" component={SinglePost} />
        <Route exact path="/notifications" component={Notifications} />
        <Route
          exact
          path="/class/:term/:subject/:classNum"
          component={ClassNewsFeed}
        />

        <ProtectedRoute exact path="/app" component={Login} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;

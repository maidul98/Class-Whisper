import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import NewsFeed from "./components/NewsFeed";
import Login from "./components/Login";
import Register from "./components/Register";
import SinglePost from "./components/SinglePost";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserContext } from "./UserContext";
import Auth from "./components/Auth";
import Notifications from "./components/Notifications";

function App() {
  const [user, setUser] = useState({
    token: null,
  });

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

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
          component={NewsFeed}
        />

        <ProtectedRoute exact path="/app" component={Login} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;

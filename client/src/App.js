import React from 'react';
import './App.css';
import Navigation from './components/Navigation'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NewsFeed from './components/NewsFeed'
import Login from './components/Login'
import Register from './components/Register'
import SinglePost from './components/SinglePost'
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={NewsFeed} />

        <Route exact path="/login" component={Login} />

        <Route exact path="/register" component={Register} />

        <Route exact path="/post" component={SinglePost}/>

        <ProtectedRoute exact path="/app">
          hello
        </ProtectedRoute>

      </Switch>
  </Router>
  );
}

export default App;

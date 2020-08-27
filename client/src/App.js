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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navigation/>
          <NewsFeed/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
      </Switch>
  </Router>
  );
}

export default App;

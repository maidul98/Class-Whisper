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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navigation/>
          <NewsFeed/>
        </Route>
      </Switch>
  </Router>
  );
}

export default App;

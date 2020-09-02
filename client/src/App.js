import React, {useState,useMemo, useEffect} from 'react';
import './App.css';
import Navigation from './components/Navigation'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import NewsFeed from './components/NewsFeed'
import Login from './components/Login'
import Register from './components/Register'
import SinglePost from './components/SinglePost'
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserContext } from "./UserContext";
import Auth from './components/Auth'

function App() {
  const [user, setUser] = useState({
    token:null
  });

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  // useEffect(()=>{
  //   fetch('users/protected', {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': localStorage.getItem('token')
  //   },
  //   }).then(response=>{
  //     if (response.status == 200 | response.status == 302){
  //       return response
  //     }else{
  //       return 
  //     }
  //   })
  // }, [])
  
  return (
    <Router>
        <UserContext.Provider value={value}>
            <Navigation/>
            <Route exact path="/" component={NewsFeed} />

            <Route exact path="/login" component={Login} />

            <Route exact path="/register" component={Register} />

            <Route exact path="/post" component={SinglePost}/>

            <ProtectedRoute exact path="/app" component={Login}/>
        </UserContext.Provider>
    </Router>
  );
}

export default App;

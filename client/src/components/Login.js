import React, { Component, useState, useContext} from "react";
import { UserContext } from "../UserContext";

function Login(props) {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const { user, setUser } = useContext(UserContext);

    function handleSubmit(event){
        event.preventDefault();
        fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({"username": email, "password": password}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((res)=>{
            if(res.status == 200 | res.status == 302){
                return res.json()
            }else{
                return 
            }
        })
        .then((userObj)=>{
            if (Object.keys(userObj).length !=0){
                setUser(userObj)
                props.history.push('/')
            }
        })
        .catch(console.log)
    }

    return (
    <div className="auth-wrapper">
        <div className="auth-inner">
            <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input  onChange={(event)=>setEmail(event.target.value)} className="form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(event)=>setPassword(event.target.value)} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div> 
    </div>
    );
  }

export default Login;


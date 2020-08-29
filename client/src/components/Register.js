import React, { Component, useState, useContext} from "react";
import { UserContext } from "../UserContext";

function Register(props) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const { user, setUser } = useContext(UserContext);

    function handleSubmit(event){
        event.preventDefault();
        fetch('/users/register', {
            method: 'POST',
            body: JSON.stringify({"username": username, "password": password}),
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
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" onChange={(event)=>setUsername(event.target.value)} className="form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(event)=>setPassword(event.target.value)} className="form-control" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
        </div> 
    </div>
    );
  }

export default Register;


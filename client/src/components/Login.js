import React, { Component, useState} from "react";

function Login() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    function handleSubmit(event){
        event.preventDefault();
        console.log(email)

        fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({"username": email, "password": password})
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch(console.log)
    }

    return (
    <div className="auth-wrapper">
        <div className="auth-inner">
            <form onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input  onChange={(event)=>setEmail(event.target.value)} className="form-control" placeholder="Enter email" />
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
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </div> 
    </div>
    );
  }

export default Login;


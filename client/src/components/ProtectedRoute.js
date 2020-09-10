import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [authState, setAuthState] = useState(true);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/user`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user._id != undefined) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

import React, { useContext } from "react";

class Auth {
  constructor() {
    this.user = {};
  }

  login(token) {
    localStorage.setItem("token", token);
  }

  logout() {
    localStorage.removeItem("token");
  }

  async getUser() {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/users/user`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((user) => user);
  }
}

export default new Auth();

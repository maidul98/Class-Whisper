import React from "react";

class Auth {
    constructor() {
      this.user = {}
    }
  
    login(token) {
      localStorage.setItem('token', token);
    }
  
    logout() {
      localStorage.removeItem('token');
    }
  
    isAuthenticated() {
      if (localStorage.getItem('token') != null){
        return true
      }else{
        return false
      }
    }

  }
  
  export default new Auth();
  
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
  
    async isAuthenticated() {
      const res =  await fetch('users/protected',{
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      }}).then(response=>{
        return response
      })

      console.log(res.status)
      if (res.status != 200){
        return false 
      }
      return true
    }

  }
  
  export default new Auth();
  
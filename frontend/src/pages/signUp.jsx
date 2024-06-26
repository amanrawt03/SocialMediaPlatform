import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
 
  const fname = useRef();
  const uname = useRef();
  const email = useRef();
  const pass = useRef();

  const navigateTo = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const fullname = fname .current.value;
    const username = uname .current.value;
    const email = email.current.value;
    const password = pass.current.value;
    
    axios.post('http://localhost:3000/api/users/register', { fullname, username, email, password })
      .then(result => {
        console.log(result);
        navigateTo('/login')
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            placeholder="Enter your Full Name"
            ref={fname}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            ref={uname}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            ref={email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            ref={pass}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </>
  );
};

export default SignUp;

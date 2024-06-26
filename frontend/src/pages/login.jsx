import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        usernameOrEmail,
        password
      });
      console.log(response.data);
      navigateTo('*')

      // Handle successful login (e.g., store token, redirect, etc.)
    } catch (err) {
      console.error(err);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="form-group">
        <label htmlFor="usernameOrEmail">Username or Email</label>
        <input
          type="text"
          className="form-control"
          id="usernameOrEmail"
          placeholder="Enter username or email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;

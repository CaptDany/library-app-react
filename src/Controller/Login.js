import React, { useState } from "react";
import { login } from "../model/api.js";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, pass); // API call for login
      console.log("Response from API:", response);
      if (response.success) {
        // Handle successful login, store authentication token, etc.
        console.log("Login successful!");
        localStorage.setItem("token", response.token);
        onLogin(response.token);
        navigate("/dashboard");
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="inner-page-titles">Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <p>Username or Email</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username or Email"
        />
        <div />
        <p>Password</p>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        />
        <div />
        <button type="submit">Login</button>
        <p>Are you new?</p>
        <Link className="logo" to={"/home"}>
          Create an account!
        </Link>
      </form>
    </div>
  );
};

export default Login;

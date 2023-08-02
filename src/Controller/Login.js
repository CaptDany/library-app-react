import React, { useState } from "react";
import { login } from "../model/api.js";
import { useNavigate } from "react-router-dom";

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
        navigate("/home");
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
      <h2>Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username or Email"
        />
        <div />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        />
        <div />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

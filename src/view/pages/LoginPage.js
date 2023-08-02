import React, { useState } from "react";
import { login } from "../../model/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, pass);
      console.log("Response from API:", response);
      if (response.success) {
        console.log("Login successful!");
        localStorage.setItem("token", response.token);
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
        <div>
          <label htmlFor="username">Username or Email:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="pass"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

import React from "react";
import Login from "../../Controller/Login";

const LoginPage = () => {
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
  };

  return (
    <div>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
